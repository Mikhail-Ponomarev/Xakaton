// создание хранилища
import {combineReducers, configureStore } from '@reduxjs/toolkit'
import reducerFirst from './Slice'
import reducerSecond from './Slice2'
import reducer3 from './Slice3'
import { jsonAPI } from './RTK' 
import hardSet from 'redux-persist/es/stateReconciler/hardSet'
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
// использование redux-persist для кэширования данных
import { persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,  
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createMigrate from 'redux-persist/es/createMigrate'
import createTransform from 'redux-persist/es/createTransform'

const migration = {
    1: (state) => {
        return {
            ...state,
            updatedField: 'default',
          }
    },
    2: (state) => {
        return {
            ...state,
            newField: 'newData'
        }
    }
}

const compressTransform = createTransform(
    // (inBoundState, key) => {
    //     return {...inBoundState, data: JSON.stringify(inBoundState.data)}
    // },
    // (outBoundState, key) => {
    //     return {...outBoundState, data: JSON.parse(outBoundState.data)}
    // },
    (inBoundState, key) => {
        // console.log(inBoundState);
        const formData = new FormData();
        for (const [name, value] of Object.entries(inBoundState)) {
            formData.append(name, value);
        }
        return { ...inBoundState, data: formData };
    },
    (outBoundState, key) => {
        console.log(outBoundState);
        const data = {};
        for (const [key, value] of outBoundState.data.entries()) {
            data[key] = value;
        }
        return { ...outBoundState, data };
    },    
    {whitelist: ['red1']}
)

const compressTransform2 = createTransform(
    (inBoundState, key) => {
        return {...inBoundState, data: JSON.stringify(inBoundState.data)}
    },
    (outBoundState, key) => {
        return {...outBoundState, data: JSON.parse(outBoundState.data)}
    },
    {whitelist: ['red2']}
)
const persistConfig = {
    key: 'root',
    storage,
    // stateReconciler: autoMergeLevel2,
    whitelist: ['red1', 'red2'],
    blacklist: ['red3'],
    version: 2,
    // migrate: createMigrate(migration, {debug: false})
    migrate: (state) => { 
        console.log(state)
        let newState
        switch (state._persist.version) {
            case 1:
                newState = {
                    ...state.red1,
                    updatedField: 'default',
                }
                break;
            case 2:
                newState = {
                    ...state,
                    newField: 'newData'
                }      
        }
        return Promise.resolve(newState)
    },
    transforms: [compressTransform, compressTransform2]
}

const rootReducer = combineReducers({
    red1: reducerFirst,
    red2: reducerSecond,
    red3: reducer3
    // [jsonAPI.reducerPath]: jsonAPI.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [
    (getDefaultMiddleware) => getDefaultMiddleware().concat(jsonAPI.middleware), 
    (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
]

const middleware1 = (getDefaultMiddleware) => getDefaultMiddleware().concat(jsonAPI.middleware)
const middleware2 = (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
})

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: [middleware1, middleware2] 
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jsonAPI.middleware),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)

// вариант хранилища без redux-persist
// export default configureStore({
//     reducer: {
//         red1: reducerFirst,
//         red2: reducerSecond,
//         [jsonAPI.reducerPath]: jsonAPI.reducer
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jsonAPI.middleware)
// })


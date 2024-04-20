import {combineReducers, configureStore } from '@reduxjs/toolkit'
import reducerFirst from './Slice'
import reducerSecond from './Slice2'
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
import createTransform from 'redux-persist/es/createTransform'


const compressTransform = createTransform(
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
    whitelist: ['red1'],
    blacklist: ['red2'],
    transforms: [compressTransform]
}

const rootReducer = combineReducers({
    red1: reducerFirst,
    red2: reducerSecond,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)


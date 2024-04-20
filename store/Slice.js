// создание среза
import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// создание асинхронного action для запросов
export const getUsers = createAsyncThunk(
    'firstSlice/getUsers',
    // если произошла ошибка, то за счет rejectWithValue, она прилетит в [getUsers.rejected]
    async function (_, {rejectWithValue, getState, dispatch}) {
        try {
            const responce = await fetch('https://jsonplaceholder.typicode.com/todos')
            if(!responce.ok) {
                throw new Error('Server error')
            }
            const data = await responce.json()
            const state = getState()
            dispatch(setUsers(data))
            dispatch(setStatus('complited'))
        } catch(error) {
            return rejectWithValue(error.message)
        }
    },
)

const controller = new AbortController()
const signal = controller.signal

const slice = createSlice({
    name: 'firstSlice',
    initialState: {
        value: 0,
        status: null,
        error: null,
        users: [],
        nested: {
            value: 0,
            figure: '1',
            nested2: {
                value: 0,
                figure: '1'
            },
        }
    },
    reducers: {
        increment(state, action) {
            state.value += action.payload.value
        },
        decrement(state, action) {
            state.value -= action.payload.value
        },
        increment2(state, action) {
            state.nested.tmp.value += action.payload.value
        },
        decrement2(state, action) {
            state.nested.tmp.value -= action.payload.value
        },
        setUsers(state, action) {
            state.users = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
            console.log(state.users)
        },
        abortRequest(state, action) {
            controller.abort()
            console.log(signal)
        },
        getSignal(state, action) {
            console.log(signal)
        }
    },
    // extraReducers нужно для работы с AsyncThunk
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.status = 'pending'
            state.error = null
        });
        // builder.addCase(getUsers.fulfilled, (state, action) => {
        //     state.status = 'complited'
        //     state.error = null
        //     state.users = action.payload
        // });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        });
    }
})
// actions - это набор reducers 
export const { increment, decrement, abortRequest, getSignal, increment2, decrement2 } = slice.actions
const  {setUsers, setStatus } = slice.actions
// reducer - формируется автоматически из всех методов, перечисленных в reducers, этот reducer надо подключить в store
export default slice.reducer
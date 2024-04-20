import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'firstSlice',
    initialState: {
        token: null,
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        removeToken(state) {
            state.token = null
        },
    },
    
})

export const { setToken, removeToken} = slice.actions
export default slice.reducer
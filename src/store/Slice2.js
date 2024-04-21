import { createSlice } from "@reduxjs/toolkit";

const Slice2 = createSlice({
    name: 'SecondSlice',
    initialState: {
        lastName: null,
        name: null,
        date: null,
        post: null,
        hobbies: null
    },
    reducers: {
        setInfo(state, action) {
            state.lastname = action.payload.lastname
            state.name = action.payload.name
            state.date = action.payload.date
            state.post = action.payload.post
            state.hobbies = action.payload.hobbies
        },
        getInfo(state) {
            return state
        }
    }
})

export const {setInfo, getInfo} = Slice2.actions
export default Slice2.reducer
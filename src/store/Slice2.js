import { createSlice } from "@reduxjs/toolkit";

const Slice2 = createSlice({
    name: 'SecondSlice',
    initialState: {
        value: 0
    },
    reducers: {
        changeValue(state, action) {
            state.value += action.payload
        }
    }
})

export const {changeValue} = Slice2.actions
export default Slice2.reducer
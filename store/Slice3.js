import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState({
    ids: [],
    entities: {}
})


const Slice3 = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: userAdapter.addOne,
        changeUser: userAdapter.updateOne,
        deleteUser: userAdapter.removeOne,
        addUsers: userAdapter.addMany,
        changeUsers: userAdapter.updateMany,
        // upsert - добавляет или меняет экзмепляр сущности
        upsertUser: userAdapter.upsertOne,
        upserUsers: userAdapter.upsertMany,
    }
})

export const {addUser, changeUser, deleteUser} = Slice3.actions
export default Slice3.reducer

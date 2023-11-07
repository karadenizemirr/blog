import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: ""
}

export const {actions,reducer} = createSlice({
    name: 'id',
    initialState: initialState,
    reducers:{
        setId:(state,action) => {
            state.id = action.payload.id
        }
    }
})
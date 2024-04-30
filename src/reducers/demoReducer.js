import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    todo : []
}

let todoSlice =  createSlice({
    name :"todo",
    initialState,
    reducers : {
        demo : (state , action) => {
            state.todo.push(action.payload);
        }
    }
})

export const {demo} = todoSlice.actions 

export default todoSlice.reducer
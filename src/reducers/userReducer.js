import { createSlice } from "@reduxjs/toolkit";


let initialState  = {
    status : false,
    userData : null,
}

let userSlice =  createSlice({
    name : "user",
    initialState ,
    reducers : {
        login : (state , action) => {
            state.status = true 
            state.userData = action.payload
        },
        logout : (state , action) => {
            state.status = false 
            state.userData = null
        }
    }
})

export const {login , logout} = userSlice.actions 

export default userSlice.reducer ;
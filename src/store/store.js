import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reducers/userReducer'
import demoReducer from "../reducers/demoReducer";



const store = configureStore({
    reducer : {
        user : userReducer ,
        todo : demoReducer ,
    }
});

export default store ;
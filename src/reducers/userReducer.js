import { createSlice } from "@reduxjs/toolkit";
import AxiosRequest from "../utils/axiosRequest";
import { backendUrl } from "../const";
import Cookies from "js-cookie";

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
        },
        upadateWatchlist : (state , action) => {
            let tokenJWT = Cookies.get("jwt"); 
        if (tokenJWT !== undefined) {
            let Watchlist =  state.userData.watch_list
            let newObject = action.payload
            let index = Watchlist.findIndex(obj => obj.token === newObject.token)
            if (index == -1) {
                Watchlist.push(newObject);
                AxiosRequest( 
                    "post",
                    `${backendUrl}/watchlist/update`,
                    newObject,
                    {
                      token: tokenJWT,
                    }
                  )
                    .then((result) => {
                      alert("success fully added !!");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
            }
            else{
                alert("already exist")
            }
          }
          else {
            alert("Sorry login please !!!");
          }
        },
        deleteWatchlist : (state , action) => {
          console.log(action.payload);
          let tokenJWT = Cookies.get("jwt"); 
      if (tokenJWT !== undefined) {
          let Watchlist =  state.userData.watch_list
          Watchlist = Watchlist.filter(obj => obj.token !== action.payload.token)
           state.userData.watch_list = Watchlist
           console.log(action.payload._id);
           AxiosRequest( 
            "post",
            `${backendUrl}/watchlist/delete`,
               {
                itemId : action.payload._id
               },
            {
              token: tokenJWT,
            }
          )
          .then((result) => {
              console.log(result);
          })
        }
        else {
          alert("Sorry login please !!!");
        }
      }
    }
})

export const {login , logout , upadateWatchlist , deleteWatchlist} = userSlice.actions 

export default userSlice.reducer ;
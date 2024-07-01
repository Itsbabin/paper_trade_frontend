import React from 'react'
import AddSvg from '../svg/AddSvg'
import AxiosRequest from '../../utils/axiosRequest'
import { backendUrl } from '../../const'
import Cookies from "js-cookie";

export default function SearchResultCard({ token , symbol , name , exch_seg}) {

    const AddToWatchlist = () => {
        
        let token = Cookies.get("jwt")
       if (token !== undefined ){
           AxiosRequest('post',`${backendUrl}/watchlist/update`,{
            token ,
            symbol , 
            name , 
            exch_seg
           },{
            token
           })
           .then((result) => {
            alert("success fully added !!")
           })
           .catch((err) => {
            console.log(err);
           })
       }
       else{
        alert("Sorry login please !!!")
       }
    }

  return (
    <div className='h-10 px-3 m-1 py-1 text-centert text-justify w-full rounded-md hover:bg-slate-800 flex justify-between items-center'>
        <div className=""> {symbol}</div>
        <div className="" onClick={AddToWatchlist}> <AddSvg /> </div>
       
    </div>
  )
}

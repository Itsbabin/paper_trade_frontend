import React, { useEffect, useState } from 'react'
import AxiosRequest from '../utils/axiosRequest'
import { backendUrl } from '../const'
import Cookies from 'js-cookie'
import WachlistCard from '../assets/cards/WatchlistCard'

export default function Watchlist() {
  const [listData, setListData] = useState([])
  useEffect(() => {
    let token = Cookies.get("jwt")
    AxiosRequest('get',`${backendUrl}/watchlist`,{},{
      token
    })
    .then((result) => {
        setListData(result.data.oder_book);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])
  
  return (
    <>
    <div className="flex w-screen flex-wrap justify-around items-center">
          <div className="flex justify-start flex-col gap-2 p-4 items-center flex-wrap rounded-lg bg-slate-500 h-[90dvh] w-[50dvw]">
            {
              listData.map((e) =>{
                return <WachlistCard key={e._id} name={e.symbol} />
              })
            }
          </div>
    </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import InstrumentCard from '../assets/cards/InstrumentCard'
import AxiosRequest from '../utils/axiosRequest'
import { backendUrl } from '../const'
import OptionCard from '../assets/cards/OptionCard'

export default function Markets() {
  const [stockData, setstockData] = useState([])
  const [futureData, setfutureData] = useState([])
  const [optionData, setoptionData] = useState([])

  useEffect(() => {
    const getFutureData = async () => {
        await AxiosRequest('post' , `${backendUrl}/trade/instrument/all_stocks` ,{
          page : 2
        })
        .then((response) => {
          // setfutureData(response.data.All_Stock);
          console.log(response);
        })
      }
      // getFutureData();
  }, [])
  
  return (
    <>
    <div className="h-full w-screen flex justify-center flex-col items-center gap-2 ">
      <div className="w-screen h-10 flex justify-around items-center gap-1">
      <div className="w-[30vw] h-10 flex justify-center items-center bg-slate-600 hover:bg-slate-700 duration-500 shadow-md shadow-black text-center font-bold rounded-full">Futures</div>
      <div className="w-[30vw] h-10 flex justify-center items-center bg-slate-600 hover:bg-slate-700 duration-500 shadow-md shadow-black text-center font-bold rounded-full">Options</div>
      </div>
      <div className="flex h-full w-screen justify-around items-center gap-1">
     
      <div className="w-[30%] h-[80dvh] overflow-auto bg-zinc-600 rounded-lg shadow-md shadow-black flex gap-3 flex-col justify-start items-center p-3 flex-nowrap">
        {
          futureData.map((e) => {
            return (
            <InstrumentCard key={e.symbol} symbol={e.symbol} />
            )
          })
        }
       
      </div>
      <div className="w-[30%] h-[80dvh] overflow-auto bg-zinc-600 rounded-lg shadow-md shadow-black flex flex-col justify-start items-center gap-2 p-2 flex-nowrap">
          <OptionCard name={"Nifty"}/>
          <OptionCard name={"Midcap Nifty"}/>
          <OptionCard name={"Bank Nifty"}/>
          <OptionCard name={"Bank Nifty"}/>
          <OptionCard name={"Bank Nifty"}/>
          <OptionCard name={"Bank Nifty"}/>
          <OptionCard name={"Bank Nifty"}/>
      </div>
      </div>
    </div>
    </>
  )
}

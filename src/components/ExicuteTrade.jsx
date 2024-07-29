import React, { useState } from 'react'

export default function ExicuteTrade() {
    const [quantity, setQuantity] = useState('0')
  return (
    <>
        <div className="h-full w-full flex justify-center items-center flex-col gap-4">
            <div className=" h-1/3 w-full bg-slate-500 flex justify-center items-center text-5xl ">
                Instrument Name
            </div>
            <div className=" h-3/5 w-full flex  bg-slate-500 justify-start pt-7 items-center flex-col">
                 <div className='flex gap-3 text-3xl justify-center items-center w-full h-1/3'>
                    <div className="w-16 h-12 text-center font-bold bg-slate-800 rounded-xl">-</div>
                    <input 
                    onChange={(e) => {
                        setQuantity(e.target.value)
                        console.log(quantity);
                    }}
                    className=' rounded-md w-32 h-12 bg-slate-900 text-white text-center' type="number"/>
                    <div className="w-16 h-12 text-center font-bold bg-slate-800 rounded-xl">+</div>
                </div>
               <div className=" h-2/4 w-1/4 flex justify-around items-center">
                    <div className="py-5 px-10 bg-green-600 rounded-lg font-bold">BUY</div>
                    <div  className="py-5 px-10 bg-red-600 rounded-lg font-bold">SELL</div>
               </div>
            </div>
        </div>
    </>
  )
}

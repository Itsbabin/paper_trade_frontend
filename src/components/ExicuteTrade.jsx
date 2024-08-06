import React, { useState } from 'react'

export default function ExicuteTrade() {
    const [quantity, setQuantity] = useState('0')
  return (
    <>
       <div className="h-[600px] w-[600px] bg-zinc-950 p-3 rounded-xl flex flex-col items-center justify-start gap-2">
           <div className="w-full h-24 bg-zinc-900 rounded-md pl-4 pt-3">
               <h3 className=' font-bold text-3xl text-zinc-400'>Instrument name</h3>
               
           </div>
           <div className="w-full h-16 bg-zinc-900 flex justify-start gap-2 items-center rounded-md pl-4">
               <h3 className=' font-bold text-3xl text-zinc-400'>LTP : {'10000'}</h3>
               <p className='text-green-500 text-lg pt-2'>2.5%</p>
               <svg width="22px" fill='none' stroke='#50ef8d' strokeWidth="1.91px" strokeMiterlimit={10} height="22px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><defs></defs><polyline className="cls-1" points="23.5 22.5 1.5 22.5 1.5 17.55 1.5 0.5"/><polyline className="cls-1" points="22.54 16.76 12.98 7.2 9.15 11.02 1.5 3.37"/><polyline  points="17.76 16.76 22.54 16.76 22.54 11.98"/></svg>
               
           </div>
           {/* <div className="w-full h-14 bg-red-950 rounded-md flex justify-center text-zinc-500 font-bold items-center">
              market is close now 
           </div> */}
           <div className="w-full h-72 bg-zinc-900 flex flex-col justify-around items-center">
             <div className="w-full h-max flex justify-around items-center p-6">
                  <div className=" w-1/3 h-14 flex justify-center items-center text-xl border-b-2">
                    Lot size :  {10}  
                  </div>
                  <div className="">X</div>
                  <div className="w-1/3 h-14  border-b-2">
                  <input id='input' placeholder='enter quantity' type="number" className='w-full h-12 bg-transparent font-bold text-xl text-center' onChange={(e) => {

                  }}  />
                  </div>
             </div>
             <div className="w-full h-max flex justify-around items-center p-6">
              <div className="w-1/3 font-bold text-2xl h-14 flex justify-center items-center bg-green-900 rounded-2xl">Buy</div>
              <div className="w-1/3 font-bold text-2xl h-14 flex justify-center items-center bg-red-800 rounded-2xl">Sell</div>
             </div>
           </div>
              {/* <div className="w-full h-14 bg-red-950 rounded-md flex justify-center text-zinc-500 font-bold items-center">
              Not enough balance
           </div> */}
       </div>
    </>
  )
}

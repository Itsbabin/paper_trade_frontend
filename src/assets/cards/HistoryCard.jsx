import React, { useEffect, useState } from 'react'

export default function HistoryCard({name , amount , time , exit_time ,exit_amount , active , _id}) {
       
  return (
    <>
        <div className="flex p-2 w-[50vw] shadow-lg shadow-black tabletMax:w-[80vw] tabletMax:flex-col justify-between items-center flex-wrap rounded-md bg-cyan-950">
            <div id="name" className='text-base font-bold text-teal-50'>{name}</div>
            <div className="">
            <div id="time" className='font-thin text-slate-400'>buy time :{time}</div>
            <div id="exit_time" className='font-thin text-slate-400'>exit time :{exit_time}</div>
            </div>
            <div className="">
            <div id="amount" className={""}>buy amount :{amount}</div>
            <div id="exit_amount" className={''}>exit amount :{exit_amount}</div>
            </div>
            <div id="profit" className={`font-bold ${exit_amount - amount >= 0 ? 'text-green-500' : 'text-red-600'}`}>{exit_amount - amount}</div>
        </div>
    </>
  )
}

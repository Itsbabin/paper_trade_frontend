import React from 'react'

export default function InstrumentCard({symbol}) {
  return (
    <>
        <div id="instrumentCardContainer" className='w-full h-max p-2 px-4 rounded-xl flex items-center bg-slate-400' >
            <div id="name">{symbol}</div>
        </div>
    </>
  )
}

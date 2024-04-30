import React from 'react'

export default function Layout(props) {
  return (
    <>  
        <div className="pt-16 p-0 font-sans bg-slate-800 top-0 left-0 text-white h-screen w-screen flex justify-center items-center overflow-y-auto flex-wrap gap-1">
         {props.children}
        </div>
    </>
  )
}

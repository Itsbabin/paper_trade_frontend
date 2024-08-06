import React from 'react'

export default function Layout({setDropdownActive,children}) {
  return (
    <>  
        <div className="pt-12 p-0 font-sans bg-zinc-900 top-0 left-0 text-white h-screen w-screen flex justify-center items-center overflow-y-auto flex-wrap" onClick={() =>{
          setDropdownActive(`-300px`)
        }}>
         {children}
        </div>
    </>
  )
}

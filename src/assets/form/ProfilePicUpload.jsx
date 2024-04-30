import React from 'react'
import CrossSvg from '../svg/CrossSvg'

export default function ProfilePicUpload({active , path , upload , setActive}) {
  return (
    <>  
        <div onClick={() =>{setActive("hidden")}} className={`${active} absolute right-8 text-5xl top-16 text-white z-10 `}>
                <CrossSvg /> 
              </div> 
      <label
              htmlFor="imageUpload"
              className={`${active} h-screen w-screen top-0 left-0 backdrop-blur-lg absolute flex justify-center gap-3 items-center flex-col`}
            >
              <img
                name="imageUpload"
                id="imageUpload"
                src={path}
                className="h-[30%] object-contain aspect-square rounded-full"
                alt="uploadable photo"
                accept="image/x-png,image/gif,image/jpeg"
              />
              <button
                onClick={upload}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Upload
              </button>
            </label>
    </>
  )
}

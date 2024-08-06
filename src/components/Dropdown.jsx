import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export default function Dropdown({active , setActive}) {
    let user = useSelector((state) => state.user);
    let navigate = useNavigate();
  return (
    <>
      <div  style={{ top : active}} className={`duration-100 z-[19] h-max w-80 bg-black absolute top-14 right-2 rounded-md flex flex-col items-center justify-start gap-1 p-2 shadow-zinc-600`}>
           <Link className="h-16 rounded-lg w-full hover:bg-zinc-800 bg-zinc-900 flex items-center justify-start text-zinc-100 text-lg font-bold gap-7 px-5" to={"/profile"} onClick={() =>{
          setActive(`-300px`)
        }}>
           <img className="h-12 aspect-square rounded-full object-fill" src={user.userData?.profile_pic_URL === ''?'./public/DP.png': user.userData?.profile_pic_URL  }  />
                <h4>Profile</h4>
           </Link>
           <div className="h-16 rounded-lg w-full  hover:bg-zinc-800 bg-zinc-900 flex items-center justify-start cursor-pointer text-zinc-100 font-bold text-lg gap-7 px-5" onClick={() => {
                window.confirm("Logout ?");
                Cookies.remove("jwt");
                navigate("/");
                window.location.reload();
              }}>
                <svg viewBox="0 0 24 24"  className='h-11 w-11 rounded-full'><path d="M2 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v2a1 1 0 1 1-2 0V6H4v12h9v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm15.293 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L18.586 13H9a1 1 0 1 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 0-1.414z" fill="#ffffff"/></svg>
           <h4>Log out </h4>
           </div>
           <Link className="h-16 rounded-lg w-full hover:bg-zinc-800 bg-zinc-900 flex items-center justify-start text-zinc-100 font-bold gap-7 px-5" to={"/profile"} onClick={() =>{
          setActive(`-300px`)
        }}>
            
           </Link> 
           <Link className="h-16 rounded-lg w-full hover:bg-zinc-800 bg-zinc-900 flex items-center justify-start text-zinc-100 font-bold gap-7 px-5" to={"/profile"} onClick={() =>{
          setActive(`-300px`)
        }}>
            
           </Link> 
           <Link className="h-16 rounded-lg w-full hover:bg-zinc-800 bg-zinc-900 flex items-center justify-start text-zinc-100 font-bold gap-7 px-5" to={"/profile"} onClick={() =>{
          setActive(`-300px`)
        }}>
           
           </Link>
           
      </div>
    </>
  )
}

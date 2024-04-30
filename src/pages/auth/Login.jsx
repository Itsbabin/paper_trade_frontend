import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AxiosRequest from '../../utils/axiosRequest.js';
import { useDispatch } from 'react-redux';
import { backendUrl } from '../../const.js';
import {login} from '../../reducers/userReducer.js'



export default function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [useridOrEmail, setUseridOrEmail] = useState('')
  const [password, setPassword] = useState('')


  const getToken = async (e) => {
    e.preventDefault();
    let  method = "post"  
    let url  =  `${backendUrl}/user/login`
    let data = {
      userid  : useridOrEmail,
      password
    }
    let response = await AxiosRequest(method , url , data)
   
    if (response.status === true) {
      alert(response.message)
      Cookies.set('jwt',response.data.token ,{expires: 7, path: '/' })
      navigate('/')
      window.location.reload()
    }
    else if(response.status === false){
      alert(response.message)
    }
   
  }

  return (
    <>
      <div className="h-screen pt-10 w-screen flex justify-center items-center">
        <div className='w-80 h-2/5 rounded-md flex flex-col justify-center gap-6 border-2 border-black items-center p-5' id="LoginCard ">
          login
          <section className=' border-2 border-black flex flex-col justify-center'>
            <label htmlFor="EmailOrUserid">
              Enter email or User id
          </label>
          <input  className=' border-2 border-black' type="text" name='EmailOrUserid' onChange={(e) => {
              setUseridOrEmail(e.target.value);
          }} required/>
          <label htmlFor="password">
             password
          </label>
          <input className=' border-2 border-black' type="text" name='password'onChange={(e) => {
              setPassword(e.target.value);
          }} required/>
          </section>
          <button onClick={getToken}>Submit</button>
          <h4>dont have account ? <a className=' text-blue-700' href="/singin"> sing in</a></h4>
        </div>
      </div>
    </>
  )
}

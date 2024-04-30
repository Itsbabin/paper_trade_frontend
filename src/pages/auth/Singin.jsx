import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosRequest from '../../utils/axiosRequest';

export default function Singin() {
  let navigate = useNavigate();

  const [name, setName] = useState('')
  const [userid, setUserid] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const getToken = async () => {
    let  method =  "post"
    let  url =  "http://127.0.0.1:8000/user/singin"
    let  data = {
      name,
      email,
      userid,
      password,
    }
    let response = await AxiosRequest(method , url , data , {})
   
     if(response.status === true) {
      alert(response.data)
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
        <div className='w-80 h-3/5 rounded-md flex flex-col justify-center gap-6 text-black border-2 border-black items-center p-5' id="LoginCard ">
          singin
          <section className=' border-2 border-black flex flex-col justify-center'>
            <label htmlFor="name">
              Name
          </label>
          <input required className=' border-2 border-black' type="text" name='name'onChange={(e) => {
              setName(e.target.value);
          }}/>
            <label htmlFor="email">
              email
          </label>
          <input required className=' border-2 border-black' type="text" name='email'onChange={(e) => {
              setEmail(e.target.value);
          }}/>
            <label htmlFor="user id">
              user id
          </label>
          <input required className=' border-2 border-black' type="text" name='user id'onChange={(e) => {
              setUserid(e.target.value);
          }}/>
          <label htmlFor="password">
             password
          </label>
          <input required className=' border-2 border-black' type="text" name='password'onChange={(e) => {
              setPassword(e.target.value);
          }}/>
          </section>
          <button onClick={getToken}>Submit</button>
        </div>
    </>
  )
}

import axios from "axios";

async function AxiosRequest (method , url , data={} ,headers={}){
  let response ;
  await axios({
        method ,
        url,
        // withCredentials: true,
        headers,
        data    
    })
    .then((userdata) => {
       response = userdata.data;
    })
    .catch((err) => {
      response =  err.response.data
    })
    
    return response ;
     
}

export default AxiosRequest ;
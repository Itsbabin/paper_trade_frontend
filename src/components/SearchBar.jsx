import React, { useEffect, useState } from 'react'
import SearchIcon from '../assets/svg/SearchIcon'
import { backendUrl } from '../const'
import axios from 'axios'
import SearchResultCard from '../assets/cards/SearchResultCard'

export default function SearchBar() {
    const [search, setSearch] = useState('')
    const [searchResult, setsearchResult] = useState([])
    // useEffect(() => {
    //     if(search != ''){
    //     AxiosRequest('post',`${backendUrl}/trade/instrument/search`,{
    //         query : search
    //     })
    //     .then((result) => {
    //         setsearchResult(result.data);
    //         console.log(result.data);
    //     })     
    // }
    // }, [search])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
      
        const fetchData = async () => {
            let url = `${backendUrl}/trade/instrument/search`
          try {
            const response = await axios.post(url,{
                query : search.replace(/\s/g, "")
            },{ signal });
            setsearchResult(response.data.data.response);
          } catch (err) {
            if (axios.isCancel(err)) {
              console.log('Request canceled', err.message);
            } else {
              console.log(err);
            }
          }
        };
        if(search != ''){
        fetchData();
        }
        else{
            setsearchResult([])
        }
        return () => {
          controller.abort();
        };
    
    }, [search])
    
    
  return (
    <>
    <div className=" tabletMax:hidden flex flex-wrap gap-2 searchMax:w-[240px]  w-[390px] ">
     <div className="container flex justify-between items-center gap-1 searchMax:w-[230px]  w-max">
         <input onChange={(e) => {
            setSearch(e.target.value)
         }} className='searchMax:w-[200px]  w-[350px] px-4 h-8 bg-slate-800 rounded-full' placeholder='Search instrument to trade' type="text" />
      <SearchIcon/>
    </div>
     <div className=" searchMax:w-[280px] w-[350px] max-h-52 min-h-0 flex gap-1 flex-wrap overflow-auto rounded-md  bg-slate-900">
        {
            searchResult.map((e) => {
                return (
                    <SearchResultCard key={e._id} symbol={e.symbol} token={e.token} name={e.name} exch_seg={e.exch_seg} />
                )
            })
        }
        
      </div>
    </div>
    </>
  )
}

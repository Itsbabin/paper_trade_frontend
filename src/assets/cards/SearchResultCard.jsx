import React from "react";
import AddSvg from "../svg/AddSvg";
import { useDispatch } from "react-redux";
import { upadateWatchlist } from "../../reducers/userReducer";
import { Link } from "react-router-dom";

export default function SearchResultCard({ token, symbol, name, exch_seg }) {
  let dispatch = useDispatch(); 
  const AddToWatchlist = () => {
      dispatch(
        upadateWatchlist({
          token,
          symbol,
          name,
          exch_seg,
        })
      );
  };

  return (
    <Link to={`/trade/${symbol}`} className="h-10 px-3 m-1 py-1 text-centert text-justify w-full rounded-md hover:bg-slate-800 flex justify-between items-center">
      <div className=""> {symbol}</div>
      <div className="" onClick={ (e) => {
           e.preventDefault()
           AddToWatchlist()
        }}>
        <AddSvg />
      </div>
    </Link>
  );
}

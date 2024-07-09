import React, { useEffect, useState } from "react";
import WachlistCard from "../assets/cards/WatchlistCard";
import { useSelector } from "react-redux";

export default function Watchlist() {
  const [watch_list, setWatch_list] = useState([]);
  let user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.status) {
      setWatch_list(user.userData.watch_list);
    }
  }, [user]);

  return (
    <>
      <div className="flex w-screen flex-wrap justify-around items-center">
        <div className="flex justify-start overflow-scroll gap-2 p-4 items-start flex-col rounded-lg bg-slate-500 h-[90dvh] w-[50dvw]">
          {watch_list.length === 0 ? (
            <div className="h-full font-bold text-2xl w-full flex justify-center items-center">
              Empty
            </div>
          ) : (
            watch_list.map((e) => {
              return  <WachlistCard key={e._id} _id={e._id} symbol={e.symbol} token={e.token} name={e.name} exch_seg={e.exch_seg}/>
            })
          )}
        </div>
      </div>
    </>
  );
}

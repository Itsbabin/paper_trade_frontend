import { useDispatch } from "react-redux";
import DeleteSvg from "../svg/DeleteSvg";
import { deleteWatchlist } from "../../reducers/userReducer";
import { Link } from "react-router-dom";

export default function OptionCard({_id, token, symbol, name, exch_seg }) {
  let dispatch  = useDispatch();
 
  const deleteCard = () => {
    dispatch(deleteWatchlist({_id, token, symbol, name, exch_seg }))
  }
  return (
    <>
      <Link to={`/trade/${symbol}`} 
        id="optionContainer"
        className=" h-24 w-full text-black text-2xl rounded-lg flex justify-between px-10 items-center py-10 duration-200 bg-white"
      >
        <div className="">{name}</div>
        <div className="cursor-pointer hover:bg-slate-300 p-2 duration-100 rounded-md" onClick={ (e) => {
           e.preventDefault()
           deleteCard()
        }}>
          <DeleteSvg />
        </div>
      </Link>
    </>
  );
}

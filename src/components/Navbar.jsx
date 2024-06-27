import Cookies from "js-cookie";
import BearSvg from "../assets/svg/BearSvg";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  let user = useSelector((state) => state.user);
  return (
    <>
      <nav className="w-screen z-20 bg-slate-950 flex flex-wrap gap-3 text-blue-200 h-14 items-center justify-between px-5 py-1 fixed">
        <div className="" id="navIcon">
          <Link to="/" className="h-12 w-12"> 
            <BearSvg/>
          </Link>
        </div>
        <div
          className="tabletMax:hidden w-[500px] flex flex-wrap justify-around"
          id="navItem"
        >
          <Link className="font-bold" to="/watchlist">watchlist</Link>
          <Link className="font-bold" to="/about">about</Link>
          <Link className="font-bold" to="/markets">markets</Link>
          {Cookies.get("jwt") !== undefined ? (
            <Link className="flex justify-center items-center" to="/profile">
              <img className="h-9 aspect-square rounded-full object-contain" src={user.userData?.profile_pic_URL}  />
            </Link>
          ) : (
            <Link className="font-bold" to="/login">login</Link>
          )}
        </div>
        <div className="tablet:hidden  bg-white" id="toggleButton">
          toggle bar
        </div>
      </nav>
      <Outlet/>
    </>
  );
}

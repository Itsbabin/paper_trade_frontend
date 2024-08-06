import Cookies from "js-cookie";
import BearSvg from "../assets/svg/BearSvg";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar({ setDropdownActive , dropdownActive}) {
  let user = useSelector((state) => state.user);
  return (
    <>
      <nav className="w-screen z-20 bg-black flex flex-wrap gap-3 text-zinc-200 h-14 items-center justify-between px-3 fixed ">
        <div className="" id="navIcon">
          <Link to="/" className="h-12 w-12"> 
            <BearSvg/>
          </Link>
        </div>
        <div
          className="tabletMax:hidden w-max flex flex-wrap gap-16 justify-between"
          id="navItem"
          >
          <SearchBar/>
          <Link className="font-bold mt-1" to="/watchlist">watchlist</Link>
          <Link className="font-bold mt-1" to="/markets">markets</Link>
          {Cookies.get("jwt") !== undefined ? (
            <div className="flex justify-center items-center cursor-pointer h-11 px-3 py-2" onClick={() => {
              if (dropdownActive === "-300px") {
                setDropdownActive("55px")
              }
              else{
                setDropdownActive("-300px")
              }
            }}>
              <img className="h-11 aspect-square rounded-full object-fill" src={user.userData?.profile_pic_URL === ''?  './public/DP.png' : user.userData?.profile_pic_URL }  />
            </div>
          ) : (
            <Link className="font-bold mt-1" to="/login">login</Link>
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

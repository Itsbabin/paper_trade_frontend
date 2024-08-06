import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AxiosRequest from "../../utils/axiosRequest";
import { backendUrl } from "../../const";
import HistoryCard from "../../assets/cards/HistoryCard";
import FeedForm from "../../assets/form/FeedForm";
import CrossSvg from "../../assets/svg/CrossSvg";
import ProfilePicUpload from "../../assets/form/ProfilePicUpload";
import FeedCard from "../../assets/cards/FeedCard";
import AddSvg from "../../assets/svg/AddSvg";

export default function Profile() {

  let user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("hidden");
  const [file, setFile] = useState("");
  const [feedForm, setFeedForm] = useState(false);
  const [path, setPath] = useState("");
  const [feed, setFeed] = useState(true)
  const [feedData, setFeedData] = useState([])
  const [history, setHistory] = useState(false)
  const [historyData, setHistoryData] = useState([])
  const [loadingMessage, setLoadingMessage] = useState(
    "loading please wait...."
  );

  useEffect(() => {
   getFeed();
  }, [])
  

  let fileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setPath(URL.createObjectURL(e.target.files[0]));
      setActive("block");
    }
  };

  let upload = async () => {
    if (file.type.substring(0, 5) === "image") {
      console.log(path);
      setLoading(true);
      setLoadingMessage("Uploading.... please wait");
      let headersList = {
        Accept: "*/*",
        token: Cookies.get("jwt"),
      };
      if (file !== "") {
        let formdata = new FormData();
        formdata.append("profilePic", file);
        await AxiosRequest(
          "post",
          `${backendUrl}/user/update/profilePic`,
          formdata,
          headersList
        ).then((response) => {
          setLoading(true);
          window.location.reload();
          console.log(response);
        });
      }
    } else {
      setLoading(true);
      setLoadingMessage("only image is aplicable");
    }
  };

  const getFeed = async () => {
    await AxiosRequest('get',`${backendUrl}/feed/fetch/personal`,{},{
      token : Cookies.get('jwt')
    })
    .then((response) => {
      setFeedData(response.data.feed)
    })
  }
  const getHistory = async () => {
    await AxiosRequest('get',`${backendUrl}/user/oderbook`,{},{
      token : Cookies.get('jwt')
    })
    .then((response) => {
      console.log(response);
      setHistoryData(response.data.oder_book)
    })
  }

  return (
    <>
     <ProfilePicUpload
              path={path}
              setActive={setActive}
              active={active}
              upload={upload}
            />
      {(loading || user.userData === null )? (
        <div className="h-max w-screen flex justify-center text-white items-center text-2xl">
          {loadingMessage}
        </div>
      ) : (
        <>
          <div className={`imageContainer bg-zinc-950 px-10 py-5 duration-700 h-[30vh] w-screen flex justify-between items-center gap-2 `}>
            <div
              className="profilePic h-[100%] bg-zinc-950 flex justify-start items-center gap-4"
            >
            <label htmlFor="profilePic" className="h-[182px] w-[182px]">
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                className="hidden"
                onChange={fileChange}
              />
              {user.userData?.profile_pic_URL === "" ||
              user.userData?.profile_pic_URL === undefined ? (
                <img
                src="./public/DP.png"
                className="h-[100%] object-fill aspect-square cursor-pointer rounded-full"
                alt="profile picture"
              />
              ) : (
                <img
                 htmlFor="profilePic"
                  src={user.userData?.profile_pic_URL}
                  // src="./public/DP.png"
                  className="h-[182px] w-[182px] object-fill aspect-square cursor-pointer rounded-full"
                  alt="profile picture"
                />
              )}
            </label>
           <div className="h-full w-[200px] bg-zinc-950 flex justify-start flex-wrap flex-col-reverse pb-5">
              <span className=" w-[200px]">exicuted {user.userData?.oder_book.length} trades</span>
              <span className="text-2xl font-bold  w-[200px]">{user.userData?.name}</span>
           </div>
            </div>
            <span className=" w-max h-full flex items-center flex-col justify-center tabletMax:pr-3 flex-wrap pb-5 pr-10">
              <p className=" text-green-500 font-bold text-3xl">
                &#8377;{user.userData?.demo_money}
              </p>
              <p className="font-bold text-white text-lg">Total Portfolio</p>
            </span>
            <div className="h-full w-[280px] flex justify-end items-end gap-3 pb-5">
              <div className="duration-500 cursor-pointer bg-zinc-200 text-black font-bold justify-around flex items-center px-4 hover:bg-zinc-50 rounded-2xl rounded-ee-none py-2 gap-3">
                Edit Profile
                </div>
            <div
                onClick={() => {
                  setFeedForm(true);
                }}
                className=" duration-500 cursor-pointer bg-zinc-200 text-black font-bold justify-around flex items-center px-4 hover:bg-zinc-50 rounded-2xl rounded-br-none py-2 gap-3"
              >
               <AddSvg color={'#000000'}/> upload 
              </div>
            </div>
          </div>
          <div className="h-[60vh] w-screen pt-0 bg-zinc-900 mt-[-22px] ">
            <div
              id="profileOptions"
              className="w-screen h-max flex justify-start items-center py-2 gap-3 px-20 shadow-black shadow-md bg-zinc-950 sticky"
            >
              <div
                id="selectIcon "
                className="flex justify-start items-center gap-8"
              >
                <div
                  onClick={() => {
                    setFeed(true)
                    setHistory(false)
                    getFeed()
                  }}
                className={`flex cursor-pointer justify-center items-center px-3 duration-200 text-xl ${feed ? "underline2 text-zinc-50" : "text-zinc-400"}`}>
                Posts
                </div>
                <div
                onClick={() => {
                  setFeed(false)
                  setHistory(true)
                  getHistory()
                }}
                className={`flex cursor-pointer justify-start items-center duration-200 after:text-xl text-xl ${history? "underline1 text-zinc-50" : "text-zinc-400"}`}>
                 History
                </div>
              </div>
             

              {feedForm ? (
                <>
                  <div
                    onClick={() => {
                      setFeedForm(false);
                    }}
                    className=" fixed top-16 right-5 text-5xl text-white z-10 "
                  >
                    <CrossSvg />
                  </div>
                  <FeedForm
                    setLoading={setLoading}
                    setLoadingMessage={setLoadingMessage}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="oders flex justify-center items-center flex-col p-2 gap-5">
              {
              history && ( historyData?.length === 0 ? <>empty..</> : historyData?.map((e) => {
                return (
                  <HistoryCard
                    key={e._id}
                    exit_time={!e.active && e.exit_time}
                    exit_amount={!e.active && e.exit_amount}
                    name={e.name}
                    time={e.time}
                    amount={e.amount}
                  />
                );
              }))
              }
              {/* {JSON.stringify(user.userData?.feed)} */}
              {
             feed &&(
              feedData.length === 0 ? <>Loading ...</> : feedData?.map((e) => {
                return (
                  <FeedCard
                    key={e._id}
                    id={e._id}
                    name={user.userData?.name}
                    image={e.imageURI}
                    caption={e.caption}
                    likes={e.likes}
                    comments={e.comments}
                    authImage={user.userData?.profile_pic_URL}
                  />
                );
              }))
            }
            </div>
          </div>
        </>
      )}
    </>
  );
}

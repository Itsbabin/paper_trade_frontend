import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AxiosRequest from "../../utils/axiosRequest";
import { backendUrl } from "../../const";
import FeedSvg from "../../assets/svg/FeedSvg";
import HistorySvg from "../../assets/svg/HistorySvg";
import ProfileSvg from "../../assets/svg/ProfileSvg";
import HistoryCard from "../../assets/cards/HistoryCard";
import FeedForm from "../../assets/form/FeedForm";
import CrossSvg from "../../assets/svg/CrossSvg";
import ProfilePicUpload from "../../assets/form/ProfilePicUpload";
import FeedCard from "../../assets/cards/FeedCard";
import AddSvg from "../../assets/svg/AddSvg";

export default function Profile() {
  let navigate = useNavigate();

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
      setHistoryData(response.data.oder_book)
    })
  }

  return (
    <>
      {(loading || user.userData === null )? (
        <div className="h-max w-screen flex justify-center text-white items-center text-2xl">
          {loadingMessage}
        </div>
      ) : (
        <>
          <div className={`imageContainer bg-slate-900 px-10 py-5 duration-700 h-[30vh] tabletMax:h-[20vh] w-screen flex justify-around items-center gap-2`}>
            <label
              htmlFor="profilePic"
              className="profilePic h-[100%] border-4 border-white bg-white aspect-square rounded-full flex justify-start items-center cursor-pointer"
            >
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                className="hidden"
                onChange={fileChange}
              />
              {user.userData?.profile_pic_URL === "" ||
              user.userData?.profile_pic_URL === undefined ? (
                <ProfileSvg />
              ) : (
                <img
                  src={user.userData?.profile_pic_URL}
                  className="h-[100%] object-contain aspect-square rounded-full"
                  alt="profile picture"
                />
              )}
            </label>
            <ProfilePicUpload
              path={path}
              setActive={setActive}
              active={active}
              upload={upload}
            />
            <span className=" w-screen flex items-center flex-col justify-end tabletMax:pr-3 pr-10 flex-wrap">
              <p className=" text-green-300 font-bold text-3xl">
                &#8377;{user.userData?.demo_money}
              </p>
              <p className="font-bold text-white text-lg">Total Portfolio</p>
            </span>
          </div>
          <div className="h-[60vh] w-screen pt-0 bg-slate-800">
            <div
              id="profileOptions"
              className="w-screen h-max flex justify-between items-center py-2 gap-3 px-6 shadow-black shadow-md bg-slate-700"
            >
              <div
                id="selectIcon "
                className="flex justify-start items-center gap-2"
              >
                <div
                  onClick={() => {
                    setFeed(true)
                    setHistory(false)
                    getFeed()
                  }}
                className={`flex cursor-pointer justify-center shadow-md shadow-black items-center px-3 duration-500 rounded-lg hover:bg-slate-600 ${feed ? "bg-slate-900 " : ""}`}>
                  <FeedSvg /> timeline
                </div>
                <div
                onClick={() => {
                  setFeed(false)
                  setHistory(true)
                  getHistory()
                }}
                className={`flex cursor-pointer justify-center shadow-md shadow-black items-center px-3 z-0 duration-500 rounded-lg scale-95 hover:bg-slate-600 ${history ? "bg-slate-900 " : ""}`}>
                  <HistorySvg />History
                </div>
              </div>
              <div
                onClick={() => {
                  setFeedForm(true);
                }}
                className=" duration-500 cursor-pointer shadow-md shadow-black justify-start flex items-center px-4 hover:bg-gray-600 rounded-lg py-2"
              >
               <AddSvg/> upload 
              </div>

              {feedForm ? (
                <>
                  <div
                    onClick={() => {
                      setFeedForm(false);
                    }}
                    className="absolute right-8 text-5xl top-16 text-white z-10 "
                  >
                    <CrossSvg />
                  </div>{" "}
                  <FeedForm
                    setLoading={setLoading}
                    setLoadingMessage={setLoadingMessage}
                  />{" "}
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
            <button
              onClick={() => {
                window.confirm("Logout ?");
                Cookies.remove("jwt");
                navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </>
  );
}

import React from "react";
import AxiosRequest from "../../utils/axiosRequest";
import { backendUrl } from "../../const";
import Cookies from "js-cookie";

export default function FeedCard({
  image,
  caption,
  likes,
  comments,
  authImage,
  name,
  id
}) {

  const LikePost = async () => {
     await AxiosRequest('post' ,`${backendUrl}/feed/like` ,{
      feed_id : id 
     },{
      token : Cookies.get('jwt')
     })
     .then((response) => {
        console.log(response);
     })
  }

  return (
    <>
      <div className="h-max rounded-lg shadow-xl shadow-black w-2/5 tabletMax:w-[98%] p-2 flex justify-center items-center flex-col bg-slate-950">
        <div className="author h-[20%] p-1 rounded-s-full rounded-e-full w-full bg-slate-800 flex justify-start gap-3 items-center ">
          <img
            className="h-[40px] object-contain aspect-square rounded-full"
            src={authImage}
            alt=""
          />
          <p>{name}</p>
        </div>
        <p className="h-max w-full p-3">{caption}</p>
        <img className="h-max w-full" src={image} alt="" />
        <div className="flex justify-start items-center h-[30px] w-full ">
          <div id="likes" className=" font-bold">
            {likes} like
          </div>
          <div id="comments">{}</div>
        </div>
        <div
          id="reactControler"
          className="h-max w-full flex justify-around items-center"
        >
          <div
            id="likeIcon"
            className="h-[35px] w-[70px] rounded-s-full rounded-e-full hover:bg-slate-800 hover:scale-110"
            onClick={LikePost}
          >
            <svg viewBox="0 0 16 16" id="like">
              <path
                fill="#1565C0"
                d="M0 7.5v7a.5.5 0 0 0 .5.5H5V7H.5a.5.5 0 0 0-.5.5z"
              ></path>
              <path
                fill="#BBDEFB"
                d="M14 6h-4V3c0-1.103-.897-2-2-2H6.5a.5.5 0 0 0-.5.5v2.367L4.066 7.252A.493.493 0 0 0 4 7.5v7a.5.5 0 0 0 .5.5h8.025a2 2 0 0 0 1.827-1.188l1.604-3.609A.491.491 0 0 0 16 10V8c0-1.103-.897-2-2-2z"
              ></path>
            </svg>
          </div>
          <div
            id="commentIcon"
            className="h-[35px] w-[70px] rounded-s-full rounded-e-full hover:bg-slate-800 hover:scale-110"
          >
            <svg viewBox="2 2 28 28" id="comment">
              <path
                fill="#ffffff"
                d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

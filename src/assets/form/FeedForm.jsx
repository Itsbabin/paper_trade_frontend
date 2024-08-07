import React, { useState } from "react";
import Cookies from "js-cookie";
import { backendUrl } from "../../const";
import AxiosRequest from "../../utils/axiosRequest";

export default function FeedForm({setLoading , setLoadingMessage}) {
  const [file, setFile] = useState("");
  const [path, setPath] = useState("");
  const [caption, setcaption] = useState("");
  const getfile = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setPath(URL.createObjectURL(e.target.files[0]));
    }
  };

  let upload = async (e) => {
    e.preventDefault()
    if (file.type.substring(0, 5) === "image") {
      setLoading(true);
      setLoadingMessage("Uploading.... please wait");
      let headersList = {
        Accept: "*/*",
        token: Cookies.get("jwt"), 
      };
      if (file !== "") {
        let formdata = new FormData();
        formdata.append("feed", file);
        formdata.append("caption", caption);
        await AxiosRequest( 
          "post",  
          `${backendUrl}/feed/upload`,
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

  return (
    <>
    
      <form action="" className="backdrop-blur-lg feedForm flex flex-col gap-4 justify-center items-center">
          <div className="text-3xl font-bold text">  Upload Feed  </div>
        <div className="card shadow-2xl shadow-slate-900 tabletMax:flex-col tabletMax:w-5/6 h-2/4 w-2/5 bg-white flex justify-around items-center rounded-2xl cursor-pointer">
          <label
            htmlFor="feedImage"
            className="h-full tabletMax:h-1/2 tabletMax:w-full w-1/2 flex justify-around items-center"
          >
            {path === "" ? (
              <div className="text-slate-700 border-4 h-1/2 w-1/2 border-dotted rounded-lg border-gray-500 flex justify-around items-center text-center cursor-pointer">
                click to add photo
              </div>
            ) : (
              <img className="h-[95%] object-contain" src={path} alt="" />
            )}
            <input
              onChange={getfile}
              type="file"
              name="feedImage"
              id="feedImage"
              className="hidden"
            />
          </label>
          <label
            htmlFor="caption"
            className="h-full tabletMax:h-1/2 tabletMax:w-full w-1/2 bg-zinc-950 tabletMax:rounded-b-2xl tablet:rounded-e-2xl flex justify-around items-center flex-col"
          >
            Whats on your mind : 
            <textarea
             name="caption" id="caption" cols="30" rows="4"
              onChange={(e) => {
                setcaption(e.target.value);
              }}
              className=" p-2 w-5/6 min-h-12 max-h-max rounded-lg bg-zinc-900"
            />
            <button onClick={upload} className="py-2.5 px-5 me-2 mb-2 text-sm bg-zinc-100 text-black rounded-3xl font-bold cursor-pointer">
              Upload
            </button>
          </label>
        </div>
      </form>
    </>
  );
}

import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const data = useSelector(state => state.user )
  console.log(data);
  return (
    <>
      <div className="">Home</div>
    </>
  );
}

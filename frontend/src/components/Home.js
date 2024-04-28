import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useOtherUsers from "../hooks/useOtherUsers";
import useGetMyTweets from "../hooks/useGetMyTweets";

function Home() {
  const { user, otherUsers } = useSelector((store) => store?.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id);
  return (
    <div className="flex justify-between w-9/12 mx-auto">
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
  );
}

export default Home;

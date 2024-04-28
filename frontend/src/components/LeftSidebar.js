import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { CiHashtag } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

function LeftSidebar() {
  const { user } = useSelector((store) => store?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-3/12">
      <div>
        <img
          src="https://www.freepnglogos.com/new-twitter-x-logo-transparent-png-4.png"
          alt=""
          className="w-8 mx-4 mb-3"
        />
      </div>
      <div>
        <ul className="flex flex-col ">
          <Link to="/">
            <li className="flex items-center  my-2 hover:bg-gray-100 hover:cursor-pointer rounded-full  py-2 px-4">
              <IoHomeOutline />
              <span className="font-bold text-xl mx-2">Home</span>
            </li>
          </Link>
          <li className="flex items-center  my-2 hover:bg-gray-100 hover:cursor-pointer rounded-full  py-2 px-4">
            <CiHashtag />
            <span className="font-bold text-xl mx-2">Explore</span>
          </li>
          <li className="flex items-center  my-2 hover:bg-gray-100 hover:cursor-pointer rounded-full  py-2 px-4">
            <IoMdNotificationsOutline />
            <span className="font-bold text-xl mx-2">Notifications</span>
          </li>
          <Link to={`/profile/${user?._id}`}>
            <li className="flex items-center  my-2 hover:bg-gray-100 hover:cursor-pointer rounded-full  py-2 px-4">
              <CiUser />
              <span className="font-bold text-xl mx-2">Profile</span>
            </li>
          </Link>

          <li className="flex items-center  my-2 hover:bg-gray-100 hover:cursor-pointer rounded-full  py-2 px-4">
            <CiBookmark />
            <span className="font-bold text-xl mx-2">Bookmarks</span>
          </li>

          <li
            onClick={logoutHandler}
            className="flex items-center  my-2 hover:bg-gray-100 hover:cursor-pointer rounded-full  py-2 px-4"
          >
            <CiLogout />
            <span className="font-bold text-xl mx-2">Logout</span>
          </li>
        </ul>
        <button className="my-1 px-4 py-2 border-none font-bold text-md bg-[#1D9BFB] w-8/12 rounded-full text-white ">
          Post
        </button>
      </div>
    </div>
  );
}

export default LeftSidebar;

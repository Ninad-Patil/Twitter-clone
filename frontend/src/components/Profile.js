import React from "react";
import Avatar from "react-avatar";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constants";
import { updateFollowing } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
function Profile() {
  const { id } = useParams();
  useGetProfile(id);
  const { user, profile } = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      try {
        //unfollow
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user?._id,
        });
        dispatch(updateFollowing(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        //follow
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {
          id: user?._id,
        });
        dispatch(updateFollowing(id));
        dispatch(getRefresh());

        toast.success(res.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-5/12 border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2 ">
          <Link
            to="/"
            className="p-2 rounded-full hover:cursor-pointer hover:bg-gray-100"
          >
            <IoArrowBackOutline size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 posts</p>
          </div>
        </div>
        <img
          src="https://pbs.twimg.com/profile_banners/1445094199624228875/1692897920/1080x360"
          alt="banner"
        />
        <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
          <Avatar
            src="https://media.licdn.com/dms/image/C4D03AQGbIm7WkA6EYQ/profile-displayphoto-shrink_800_800/0/1659060480753?e=1719446400&v=beta&t=2ejcmxXM6YfAvk4TOJjpnYH_43yYFrBwaYfIK3qLwEQ"
            size="120"
            round={true}
          />
        </div>
        <div className="text-right m-4">
          {id === user?._id ? (
            <button className="hover:bg-gray-200 px-4 py-1 rounded-full text-right  border border-gray-400">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={followAndUnfollowHandler}
              className=" px-4 py-1 bg-black rounded-full text-white"
            >
              {user?.following.includes(id) ? "following" : "follow"}
            </button>
          )}
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>{profile?.username}</p>
        </div>
        <div className="m-4 text-sm">
          <p>Web Dev || ds Algo</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;

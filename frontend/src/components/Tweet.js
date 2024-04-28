import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";

import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

import { getRefresh } from "../redux/tweetSlice";
function Tweet({ tweet }) {
  const loggedInUserId = useSelector((store) => store?.user?.user?._id);
  const dispatch = useDispatch();
  const likeorDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: loggedInUserId },
        { withCredentials: true }
      );
      dispatch(getRefresh());
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      dispatch(getRefresh());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://media.licdn.com/dms/image/C4D03AQGbIm7WkA6EYQ/profile-displayphoto-shrink_800_800/0/1659060480753?e=1719446400&v=beta&t=2ejcmxXM6YfAvk4TOJjpnYH_43yYFrBwaYfIK3qLwEQ"
            size="40"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center ">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">{`@${tweet?.userDetails[0]?.username}. `}</p>
            </div>
            <div>
              <p>{tweet?.description} </p>
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <FaRegComment />
                </div>

                <p>0</p>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => likeorDislikeHandler(tweet?._id)}
                  className="p-2 hover:bg-red-200 rounded-full cursor-pointer"
                >
                  <FaRegHeart />
                </div>

                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
                  <CiBookmark />
                </div>
                <p>0</p>
              </div>
              {loggedInUserId === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 hover:bg-red-400 rounded-full cursor-pointer">
                    <MdOutlineDeleteOutline />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;

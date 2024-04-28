import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from "../redux/tweetSlice";
function CreatePost() {
  const [description, setDescription] = useState("");
  const id = useSelector((store) => store?.user?.user?._id);
  const { isActive } = useSelector((store) => store?.tweet);
  const dispatch = useDispatch();
  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      if (res?.data?.success) {
        toast.success(res?.data?.messsage);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setDescription("");
  };
  const forYouHandler = () => {
    //if true means its on for you
    dispatch(getIsActive(true));
  };
  const followingHandler = () => {
    //false means its on following
    dispatch(getIsActive(false));
  };
  return (
    <div className="w-full">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-4 border-blue-400 "
                : "border-b-4 border-transparent "
            }cursor-pointer hover:bg-gray-200 w-full text-center px-3 py-4 `}
          >
            <h1 className=" font-semibold text-gray-600 text-lg">For you</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive
                ? "border-b-4 border-blue-400 "
                : "border-b-4 border-transparent "
            }cursor-pointer hover:bg-gray-200 w-full text-center px-3 py-4 `}
          >
            <h1 className=" font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
        <div className="">
          <div className=" flex items-center p-4">
            <div>
              <Avatar
                src="https://media.licdn.com/dms/image/C4D03AQGbIm7WkA6EYQ/profile-displayphoto-shrink_800_800/0/1659060480753?e=1719446400&v=beta&t=2ejcmxXM6YfAvk4TOJjpnYH_43yYFrBwaYfIK3qLwEQ"
                size="40"
                round={true}
              />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" ml-2 w-full outline-none  border-none text-xl"
              type="text"
              placeholder="What is happening?!"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div>
              <CiImageOn size="24px" />
            </div>
            <button
              onClick={submitHandler}
              className="bg-[#1D9BFB] text-white text-lg rounded-full px-4 py-1 border-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

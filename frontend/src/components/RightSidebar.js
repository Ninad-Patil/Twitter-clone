import React from "react";
import { IoIosSearch } from "react-icons/io";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
function RightSidebar({ otherUsers }) {
  return (
    <div className="w-3/12 ">
      <div className="flex  items-center p-2 bg-gray-100 rounded-full outline-none">
        <IoIosSearch />
        <input
          type="text"
          className="bg-transparent outline-none px-2 w-full "
          placeholder="Search"
        />
      </div>
      <div>
        <div className="p-4 my-4 bg-gray-100 rounded-2xl w-full">
          <h1 className="font-bold text-lg ">Who to follow</h1>
          {otherUsers?.map((user) => {
            return (
              <div
                key={user?._id}
                className="flex items-center justify-between my-3"
              >
                <div className="flex">
                  <Avatar
                    src="https://media.licdn.com/dms/image/C4D03AQGbIm7WkA6EYQ/profile-displayphoto-shrink_800_800/0/1659060480753?e=1719446400&v=beta&t=2ejcmxXM6YfAvk4TOJjpnYH_43yYFrBwaYfIK3qLwEQ"
                    size="40"
                    round={true}
                  />
                </div>

                <div className="ml-2">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.username}`}</p>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <button className="px-4 py-1 bg-black text-white rounded-full ">
                      Profile
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;

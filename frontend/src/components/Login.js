import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";
function Login() {
  const [isLogin, setisLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      //login
      try {
        const res = await axios.post(USER_API_END_POINT + "/login", {
          email,
          password,
        });
        // console.log(res);
        if (res.data.success) {
          dispatch(getUser(res?.data?.user));
          toast.success(res.data.message);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //signup
      try {
        const res = await axios.post(USER_API_END_POINT + "/register", {
          name,
          email,
          username,
          password,
        });
        // console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
          setisLogin(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loginSignUpHandler = () => {
    setisLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            src="https://www.freepnglogos.com/new-twitter-x-logo-transparent-png-4.png"
            alt=""
            className="w-56 mx-4 mb-3"
          />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-6xl">Happening now.</h1>
          </div>
          <h1 className="mt-4 mb-2 text-2xl font-bold">
            {isLogin ? "Login" : "SignUp"}
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col w-[55%]">
            {!isLogin && (
              <>
                <input
                  className="font-semibold my-1  outline-blue-500 border border-gray-800 px-3  py-2 rounded-full"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="font-semibold my-1  outline-blue-500 border border-gray-800 px-3  py-2 rounded-full"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </>
            )}

            <input
              className="font-semibold my-1  outline-blue-500 border border-gray-800 px-3  py-2 rounded-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="font-semibold my-1  outline-blue-500 border border-gray-800 px-3  py-2 rounded-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-[#1D9BFB] border-none py-2 my-4 rounded-full text-lg text-white">
              {isLogin ? "Login" : "Create Account"}
            </button>
            <h1>
              {isLogin ? "Do not have an account?" : "Already have an accout?"}{" "}
              <span
                className="font-bold text-blue-600 cursor-pointer"
                onClick={loginSignUpHandler}
              >
                {isLogin ? "SignUp" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

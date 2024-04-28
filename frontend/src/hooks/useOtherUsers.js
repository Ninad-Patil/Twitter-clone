import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import { useEffect } from "react";
import { getOtherUsers } from "../redux/userSlice";
import { useDispatch } from "react-redux";
const useOtherUsers = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/otherUsers/${id}`, {
          withCredentials: true,
        });

        dispatch(getOtherUsers(res.data.otherUsers));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUser();
  }, []);
};

export default useOtherUsers;

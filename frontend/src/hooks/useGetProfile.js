import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import { useEffect } from "react";
import { getMyProfile } from "../redux/userSlice";
import { useDispatch } from "react-redux";
const useGetProfile = (id) => {
  const dispatch = useDispatch();

  const fetchMyProfile = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
        withCredentials: true,
      });

      dispatch(getMyProfile(res.data.user));
    } catch (error) {
      console.log(error);
    }
  };
  //fetchMyProfile();
  useEffect(() => {
    fetchMyProfile();
  }, [id]);
};

export default useGetProfile;

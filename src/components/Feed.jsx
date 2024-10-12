import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const userData = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get (BASE_URL + "/user/feed", {
        withCredentials : true
      });

      dispatch (addFeed(res.data.data));
    }
    catch (err) {
      console.log (err);
    }
  }

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  useEffect (() => {
    getFeed();
  }, [])

  return (
    <>
    {userData ? (
      feed ? (
        <UserCard user={feed[1]} />
      ) : (
        <p className="text-center text-gray-500">No Users Available</p>
      )
    ) : null}
  </>
  );
};

export default Feed;

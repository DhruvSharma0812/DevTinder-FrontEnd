import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const userData = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState(0); // State to keep track of the current user index

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  useEffect(() => {
    getFeed();
  }, []);

  const handleNext = () => {
    if (feed && currentIndex < feed.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next user
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the previous user
    }
  };

  return (
    <>
      {userData ? (
        feed && feed.length > 0 ? (
          <div className="user-card-container">
            <UserCard user={feed[currentIndex]} /> {/* Show the user at current index */}
            <div className="navigation-buttons">
              <button onClick={handlePrevious} disabled={currentIndex === 0}>
                Previous
              </button>
              <button onClick={handleNext} disabled={currentIndex === feed.length - 1}>
                Next
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-center text-gray-500">Nothing to show</h1> // Show message if feed is empty
        )
      ) : null}
    </>
  );
};

export default Feed;

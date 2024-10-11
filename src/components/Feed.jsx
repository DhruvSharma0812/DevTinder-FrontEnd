import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Feed = () => {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]); 

  return (
    <>
      {userData ? (
        <div>
          Feed
        </div>
      ) : null} 
    </>
  );
};

export default Feed;

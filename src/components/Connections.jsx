import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null; // Change from return to return null
  if (connections.length === 0) return <h1 className="flex justify-center my-10">No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-4xl mb-6">Connections</h1>

      <div className="flex flex-wrap justify-center">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col items-center m-4 p-6 rounded-lg bg-base-300 shadow-lg transition-transform transform hover:scale-105 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <img
                alt="photo"
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-indigo-500"
                src={photoUrl}
              />
              <div className="text-left">
                <h2 className="font-bold text-2xl text-indigo-600 mb-1">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-white mb-1">
                    {age + ", " + gender}
                  </p>
                )}
                <p className="text-white">{about}</p>

                <Link to={"/chat/" + _id} className="flex justify-center">
                  <button className="px-6 py-2 mt-3 text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 active:scale-95">
                    Chat
                  </button>
                </Link>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

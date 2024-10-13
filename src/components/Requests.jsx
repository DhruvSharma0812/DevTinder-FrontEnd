import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {

    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post (BASE_URL + "/request/review/" + status + "/" + _id, 
                {},
                {withCredentials : true},
            );

            dispatch(removeRequest (_id));
        }
        catch (err) {
            console.log (err);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/recieved", { withCredentials: true });
            console.log(res.data.data);
            dispatch(addRequests(res.data.data))
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;

    if (requests.length === 0)
        return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-white text-4xl mb-6">Connection Request</h1>

            <div className="flex flex-wrap justify-center">
                {requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } =
                        request.fromUserId;

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
                            </div>
                            <div className="flex justify-center space-x-4 p-4">
                                <button 
                                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
                                onClick={() => reviewRequest ("rejected", request._id)}
                                >
                                    Reject
                                </button>
                                <button 
                                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
                                onClick={ () => reviewRequest ("accepted", request._id)}
                                >
                                    Accept
                                </button>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Requests

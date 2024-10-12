import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";


const UserCard = (user) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user.user;
    console.log(user.user.skills);
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-80 sm:w-96 text-white bg-base-300 rounded-lg -mt-20 shadow-lg overflow-hidden">
                <figure className="relative">
                    <img
                        src={photoUrl}
                        alt={`${firstName}'s profile`}
                        className="w-full h-72 object-cover"
                    />
                </figure>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white">
                        {firstName} {lastName}
                    </h2>
                    {age && gender && (
                        <p className="text-sm text-white mt-1">
                            {age}, {gender}
                        </p>
                    )}
                    <p className="text-sm text-white mt-3">{about}</p>

                    {/* Skills Section */}
                    {skills.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-md font-bold text-white">Skills</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            className="flex-1 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-all"
                            onClick={() => handleSendRequest("ignored", _id)}
                        >
                            Ignore
                        </button>
                        <button
                            className="flex-1 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition-all"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            Interested
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard

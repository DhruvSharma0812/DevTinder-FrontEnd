import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const EditProfile = ({ user: initialUser }) => {
  const [user, setUser] = useState({ ...initialUser, skills: initialUser.skills || [] }); // Track user & skills
  const [newSkill, setNewSkill] = useState(""); // Track new skill input
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value })); // Update user fields
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setUser((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill(""); // Clear input after adding
    }
  };

  const handleRemoveSkill = (skill) => {
    setUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        user,
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                {["firstName", "lastName", "photoUrl", "age", "gender", "about"].map((field) => (
                  <label key={field} className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">{field.replace(/([A-Z])/g, ' $1')}:</span>
                    </div>
                    <input
                      type="text"
                      name={field}
                      value={user[field] || ""}
                      className="input input-bordered w-full max-w-xs"
                      onChange={handleInputChange}
                    />
                  </label>
                ))}
              </div>

              {/* Skills Section */}
              <div className="my-4">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    className="input input-bordered w-full"
                    placeholder="Add a new skill"
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button className="btn btn-secondary" onClick={handleAddSkill}>
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {user.skills.map((skill, index) => (
                    <div key={index} className="badge badge-outline flex items-center">
                      {skill}
                      <button className="ml-2 text-red-500" onClick={() => handleRemoveSkill(skill)}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>



        <div className="w-full max-w-md">
          <h2 className="text-center text-2xl font-semibold bg-base-200 p-2">Preview</h2>
          <UserCard user={user} />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

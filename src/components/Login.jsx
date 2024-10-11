import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:7777/login", {
        emailId,
        password,
      },
      {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
      return navigate ("/");
    } catch (err) {
      console.log(err.response ? err.response.data : err.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center -mt-16">
      <div className="bg-base-300 text-white shadow-xl rounded-lg p-8 max-w-sm w-full transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login to DevTinder
        </h2>
        <form>
          {/* emailId Input */}
          <div className="mb-5">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="emailId"
            >
              emailId
            </label>
            <input
              id="emailId"
              type="email" // Change from "emailId" to "email"
              value={emailId}
              className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required
              onChange={(e) => setemailId(e.target.value)}
            />

          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleLogin}
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <a className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

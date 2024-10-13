import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isLoginFrom, setIsLoginFrom] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const handleSignup = async (event) => {
    event.preventDefault();

    // Debugging: Check values before sending
    console.log("Signup Data:", { firstName, lastName, emailId, password });

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      console.log("Signup Response:", res);
      dispatch(addUser(res.data.data));
      navigate("/")
    } catch (err) {
      // Debugging: Check the error response
      console.log("Error during signup:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : err.message || "Something went wrong");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      },
        {
          withCredentials: true,
        });
      dispatch(addUser(res.data.data));
    } catch (err) {
      const errorMessage = err?.response?.data || "Something went wrong";
      setError(errorMessage);
      console.log(errorMessage);
    }
  };

  return (
    <>
      {!userData ? (
        <div className="min-h-screen flex items-center justify-center -mt-16">
          <div className="bg-base-300 text-white shadow-xl rounded-lg p-8 max-w-sm w-full transition-transform duration-300 hover:scale-105">
            <h2 className="text-3xl font-bold text-center mb-6">
              {isLoginFrom ? "Login" : "Sign Up"}
            </h2>
            <form>
              {!isLoginFrom && (
                <>
                  <div className="mb-5">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-2"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-2"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      required
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="mb-5">
                <label
                  className="block text-gray-300 text-sm font-medium mb-2"
                  htmlFor="emailId"
                >
                  Email
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

              <p className="text-red-500 mb-4">{error}</p>

              <div className="flex items-center justify-between">
                <button
                  onClick={isLoginFrom ? handleLogin : handleSignup}
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isLoginFrom ? "Login" : "Sign up"}
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <p
                onClick={() => setIsLoginFrom((value) => !value)}
                className="text-sm cursor-pointer text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                {isLoginFrom ? "New User? Sign up here" : "Existing User? Login Here"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Login;

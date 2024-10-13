import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post (BASE_URL + "/logout", {}, {withCredentials : true});
            dispatch (removeUser());
            return navigate ('/login');
        }
        catch (err) {
            console.log (err);
        }
    }

    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="flex-1 mx-3 cursor-pointer">
                    <Link to="/">
                        <a className="text-3xl font-bold text-red-500 hover:text-red-400 transition duration-300">
                            DevTinder
                        </a>
                    </Link>
                </div>

                {user && <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end mx-5 flex">
                        <p   className="p-3 cursor-pointer text-lg font-semibold text-gray-200 hover:text-white transition-colors duration-200">
                            {user.firstName}
                        </p>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Photo URL"
                                    src={user.photoUrl} />
                            </div>

                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to = "/profile" className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li><Link to="/connections">Connections</Link></li>
                            <li onClick={handleLogout} > <Link>Logout</Link> </li>
                        </ul>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Navbar

import { useSelector } from "react-redux"

const Navbar = () => {

    const user = useSelector((store) => store.user);

    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="flex-1 mx-3 cursor-pointer">
                    <a className="text-3xl font-bold text-red-500 hover:text-red-400 transition duration-300">
                        DevTinder
                    </a>
                </div>

                {user && <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end mx-5 flex">
                        <p   className="p-3 cursor-pointer text-lg font-semibold text-gray-200 hover:text-white transition-colors duration-200">
                            {user.data.firstName}
                        </p>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Photo URL"
                                    src={user.data.photoUrl} />
                            </div>

                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Navbar

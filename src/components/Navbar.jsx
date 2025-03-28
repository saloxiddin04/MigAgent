import React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import logo from "../assets/logo_header.png"
import {getUserData, logout} from "../auth/jwtService.js";

const Navbar = () => {
	const navigate = useNavigate()
	
	return (
		<>
			<header className="bg-white fixed shadow-lg w-100 p-3 w-full z-50">
				<nav className="container mx-auto">
					<div className="flex items-center justify-between">
						<div>
							<NavLink to="/">
								<img
									src={logo}
									alt="logo"
									className="md:w-100 w-50"
								/>
							</NavLink>
						</div>
						{getUserData() ? (
							<div className="flex items-center gap-5 sm:gap-7">
								<div className="user-block flex items-center gap-3">
									{getUserData() && (
										<div className="text-end mr-2 flex gap-3">
											<div>
			                  <span className="block text-xs sm:text-sm font-medium">
			                    Ismingiz:
			                  </span>
												<span className="block text-lg font-medium text-gray-500">
	                        {getUserData().first_name}
                        </span>{" "}
											</div>
										</div>
									)}
									<button className="">
										<i className="fas fa-user"></i>
										{/*<FaUserAlt size="20" />*/}
									</button>
									<div className="tooltip hidden sm:block">
										<div className="shadow-md bg-white py-2 w-full rounded">
											<Link
												to={"/profile"}
												className="px-3 py-2 hover:bg-blue-500 hover:text-white flex justify-between items-center w-full"
											>
												<span className="text-sm sm:text-base">Profil</span>
												{/*<FaUserAlt size="20" />*/}
											</Link>
											<button
												onClick={logout}
												className="px-3 py-2 hover:bg-blue-500 hover:text-white flex justify-between items-center w-full cursor-pointer"
											>
												<span className="text-sm sm:text-base">Tizimdan chiqish</span>
												{/*<MdOutlineLogout size="18" />*/}
											</button>
										</div>
									</div>
								</div>
							</div>
						) : (
							<button className="btn btn-primary" onClick={() => navigate("/login")}>Tizimga kirish</button>
						)}
					</div>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
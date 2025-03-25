import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
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
							<button className="btn btn-danger" onClick={logout}>Tizimdan chiqish</button>
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
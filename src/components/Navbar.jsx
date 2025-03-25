import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "../assets/logo_header.png"

const Navbar = () => {
	return (
		<>
			<header className="bg-white fixed shadow-lg w-100 p-3 w-full z-50">
				<nav className="container mx-auto">
					<div className="flex items-center justify-center">
						<div className="col-6 col-md-4">
							<NavLink to="/">
								<img
									src={logo}
									alt="logo"
									className="md:w-100"
								/>
							</NavLink>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
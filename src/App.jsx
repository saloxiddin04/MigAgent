import React, {useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Main from "./pages/Main/Main.jsx";
import Login from "./pages/Auth/Login.jsx";
import Profile from "./pages/Auth/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Test from "./pages/Test/Test.jsx";
// import {getUserData} from "./auth/jwtService.js";

const App = () => {
	
	const {pathname} = useLocation()
	// const navigate = useNavigate()
	
	// useEffect(() => {
	// 	if (!getUserData() && (pathname !== "/login" || pathname !== "/profile")) {
	// 		navigate("/");
	// 	}
	// }, [navigate, pathname]);
	
	return (
		<>
			{pathname !== "/login" && <Navbar/>}
			
			<Routes>
				<Route path="/" element={<Main/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/profile" element={<Profile/>} />
				<Route path="/test" element={<Test/>} />
			</Routes>
			
			{pathname !== "/login" && <Footer/>}
			
			<ToastContainer
				autoClose={2000}
				hideProgressBar={true}
				theme="colored"
				position="bottom-left"
			/>
		</>
	);
};

export default App;
import React from 'react';
import {ToastContainer} from "react-toastify";
import Navbar from "./components/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
	
	return (
		<>
			<Navbar/>
			
			<Routes>
				<Route path="/" element={<Main/>} />
			</Routes>
			
			<Footer/>
			
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
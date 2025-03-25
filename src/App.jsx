import React from 'react';
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main.jsx";

const App = () => {
	
	return (
		<>
			<Routes>
				<Route path="/" element={<Main/>} />
			</Routes>
			
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
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
			<h1 className="text-6xl font-bold text-[#067BBE]">404</h1>
			<p className="text-2xl mt-4 text-gray-800">Sahifa topilmadi</p>
			<p className="text-gray-600 mt-2 mb-6 text-center">
				Kechirasiz, siz izlayotgan sahifa mavjud emas yoki ko‘chirib o‘zgartirilgan.
			</p>
			<Link
				to="/"
				className="px-6 py-2 bg-[#067BBE] text-white rounded hover:bg-blue-700 transition"
			>
				Bosh sahifaga qaytish
			</Link>
		</div>
	);
};

export default NotFound;

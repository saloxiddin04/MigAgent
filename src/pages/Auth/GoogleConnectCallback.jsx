import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getUserDetail} from "../../redux/Slices/userDetailSlice/userDetailSlice.js";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import Loader from "../../components/Loader.jsx";
import instance from "../../plugins/axios";

const GoogleConnectCallback = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const code = params.get("code");
		const state = params.get("state");
		const error = params.get("error");

		console.log(code)
		console.log(state)

		// const sendResultToOpener = (type, data) => {
		// 	if (window.opener) {
		// 		window.opener.postMessage({ type, ...data }, window.location.origin);
		// 	}
		// 	// Close the popup after a short delay
		// 	setTimeout(() => window.close(), 100);
		// };
		//
		// if (error) {
		// 	sendResultToOpener("google-auth-error", { error });
		// 	return;
		// }
		//
		// if (!code || !state) {
		// 	sendResultToOpener("google-auth-error", { error: "Missing code or state" });
		// 	return;
		// }

		// Send code and state to your backend to exchange for token
		instance.post("/auth/google/connect/exchange", {code, state})
			.then((response) => {
				if (response.status === 200) {
					dispatch(getUserDetail())?.then(() => {
						navigate("/")
						toast.success("Successfully linked");
					})
				}
			})
			.catch((err) => {
				const errorMsg = err.response?.data?.error || err.message;
				console.log(errorMsg)
				toast.error(errorMsg)
			})

	}, [dispatch, location, navigate]);

	return (
		<div className="mt-64">
			<Loader/>
		</div>
	);
};

export default GoogleConnectCallback;
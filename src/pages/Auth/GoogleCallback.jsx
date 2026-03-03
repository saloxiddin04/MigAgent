import React, { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../plugins/axios";
import {setAccessToken, setCookie, setRefreshToken} from "../../auth/jwtService.js";
import {getUserDetail} from "../../redux/Slices/userDetailSlice/userDetailSlice.js";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import Loader from "../../components/Loader.jsx";
import instance from "../../plugins/axios";

const GoogleCallback = () => {
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
		if (location?.state?.is_google_linked) {
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
		} else {
			axios
				.post("/auth/google/exchange", { code, state }) // adjust endpoint
				.then((response) => {
					setAccessToken(response?.data?.token?.access)
					setRefreshToken(response?.data?.token?.refresh_token)
					setCookie("auth_status", JSON.stringify(response?.data?.auth_status));
					setCookie("user_roles", JSON.stringify(response?.data?.user_roles));
					setCookie("auth_type", JSON.stringify(response?.data?.auth_type));
					if (response?.data?.auth_status === "new") {
						navigate("/profile")
					} else {
						dispatch(getUserDetail())?.then(() => {
							navigate("/")
							toast.success("Successfully logged");
						})
					}
					// const { access_token, user } = response.data;
					// sendResultToOpener("google-auth-success", { access_token, user });
				})
				.catch((err) => {
					const errorMsg = err.response?.data?.error || err.message;
					console.log(errorMsg)
					localStorage.setItem("errorMsg", JSON.stringify(errorMsg))
					// sendResultToOpener("google-auth-error", { error: errorMsg });
				});
		}
	}, [dispatch, location, navigate]);

	return (
		<div className="mt-64">
			<Loader />
		</div>
	);
};

export default GoogleCallback;
import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import axios from "../../plugins/axios.js";
import {setAccessToken, setCookie, setRefreshToken} from "../../auth/jwtService.js";
import {getUserDetail} from "../../redux/Slices/userDetailSlice/userDetailSlice.js";
import {toast} from "react-toastify";

const MyIdCallBack = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const code = params.get("code") || params.get("auth_code");
		const session_id = params.get("session_id")

		const codeKey = params.get("code") ? "code" : "auth_code";

		axios.post("/auth/login/myid/user", {[codeKey]: code}).then((response) => {
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
			axios.post(`/auth/myid/sdk?session_id=${session_id}`, {})
		}).catch((err) => {
			const errorMsg = err.response?.data?.error || err.message;
			console.log(errorMsg)
			localStorage.setItem("errorMsg", JSON.stringify(errorMsg))
		})
	}, [dispatch, location, navigate])

	return (
		<div className="mt-64">
			<Loader />
		</div>
	);
};

export default MyIdCallBack;

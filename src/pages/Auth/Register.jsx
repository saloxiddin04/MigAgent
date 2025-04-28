import React from "react";
import {verifyCode} from "../../auth/jwtService";
import { useState } from "react";
import { toast } from "react-toastify";
import logo from "../../assets/logo_header.png"
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getUserDetail} from "../../redux/Slices/userDetailSlice/userDetailSlice.js";

const Register = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {state} = useLocation()
	
	const [code, setCode] = useState(null)
	
	const registerUser = (e) => {
		e.preventDefault();
		verifyCode({code})?.then((res) => {
			if (state?.forgot) {
				navigate("/forgot")
			} else {
				if (res?.data?.auth_status === "done") {
					dispatch(getUserDetail())?.then(() => {
						navigate("/")
						toast.success("Successfully logged");
					})
				} else {
					toast.success("Successfully registered");
					navigate("/profile")
				}
			}
		})
			.catch((err) => {
				toast.error(err?.response?.data?.error || err?.message);
			});
	};
	
	return (
		<div className="w-full min-h-screen flex items-center justify-center bg-[rgb(248,249,250)]">
			<div className="w-3/4 lg:w-1/4 sm:w-2/4">
				<div className="text-center">
					<img src={logo} alt="logo" className={'w-full object-cover m-auto'}/>
					<h2 className="text-center text-2xl font-bold text-black my-4">
						{state?.forgot ? (
							"Parol tiklash"
						) : (
							"Tizimga kirish"
						)}
					</h2>
					<p>
						<a className="underline" href={`tg://resolve?domain=test_xorijdaish_bot`}>@xorijdaishbot</a> telegram botiga kiring va 1 daqiqalik kodingizni oling
					</p>
				</div>
				
				<div className="mt-8">
					<form onSubmit={registerUser}>
						<div className="my-4">
							<input
								id="code"
								required
								type="text"
								name="code"
								placeholder="Kod"
								className="form-input"
								maxLength={6}
								value={code || ""}
								onChange={(e) => setCode(e.target.value)}
							/>
						</div>
						<div className="my-4">
							<input
								id="confirm"
								required
								type="submit"
								name="confirm"
								className="btn btn-primary w-full"
								value={"Tasdiqlash"}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
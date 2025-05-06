import React from "react";
import {resetPassword, setUserData} from "../../auth/jwtService";
import {useState} from "react";
import {toast} from "react-toastify";
import logo from "../../assets/Logo_Color.svg"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getUserDetail} from "../../redux/Slices/userDetailSlice/userDetailSlice.js";

const Forgot = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	const [password, setPassword] = useState(null)
	const [re_password, setRePassword] = useState(null)
	
	const [visible, setVisible] = useState(false)
	
	const loginFunc = (e) => {
		e.preventDefault();
		resetPassword({password, re_password})?.then((res) => {
			if (res?.detail) {
				toast.success("Parol muvofaqqiyatli yangilandi")
				dispatch(getUserDetail())?.then(({payload}) => {
					setUserData(payload)
					navigate("/")
				})
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
						Parol tiklash
					</h2>
				</div>
				
				<div className="mt-8">
					<form onSubmit={loginFunc}>
						<div
							className="my-4 flex items-center gap-2 border w-full py-[10px] px-[25px] border-[#3b82f6] rounded-[8px] focus-within:shadow-[5px_5px_5px_rgba(0,0,0,0.3)] transition">
							<input
								id="password"
								required
								type={visible ? "text" : "password"}
								name="password"
								placeholder="Parol"
								className="w-full outline-none"
								value={password || ""}
								onChange={(e) => setPassword(e.target.value?.trim())}
							/>
							<span onClick={() => setVisible(!visible)}>
                {
	                visible
		                ?
		                <i className="fa fa-eye text-[#3b82f6]" aria-hidden="true"></i>
		                :
		                <i className="fa fa-eye-slash text-[#3b82f6]" aria-hidden="true"></i>
                }
              </span>
						</div>
						
						<div
							className="my-4 flex items-center gap-2 border w-full py-[10px] px-[25px] border-[#3b82f6] rounded-[8px] focus-within:shadow-[5px_5px_5px_rgba(0,0,0,0.3)] transition">
							<input
								id="re_password"
								required
								type={visible ? "text" : "password"}
								name="re_password"
								placeholder="Parol tasdiqlash"
								className="w-full outline-none"
								value={re_password || ""}
								onChange={(e) => setRePassword(e.target.value?.trim())}
							/>
							<span onClick={() => setVisible(!visible)}>
                {
	                visible
		                ?
		                <i className="fa fa-eye text-[#3b82f6]" aria-hidden="true"></i>
		                :
		                <i className="fa fa-eye-slash text-[#3b82f6]" aria-hidden="true"></i>
                }
              </span>
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

export default Forgot;
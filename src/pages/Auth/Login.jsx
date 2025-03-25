import React from "react";
import { register } from "../../auth/jwtService";
import { useState } from "react";
import { toast } from "react-toastify";
import logo from "../../assets/logo_header.png"

const Login = () => {
	
	const [user, setUser] = useState({
		username: "",
		name: "",
		email: '',
		password: "",
	});
	
	const registerUser = (e) => {
		e.preventDefault();
		register(user)
			.then(() => {
				toast.success("Successfully registered");
			})
			.catch((err) => {
				toast.error(err.response.data.error || err.message);
			});
	};
	
	return (
		<div className="w-full min-h-screen flex items-center justify-center bg-[rgb(248,249,250)]">
			<div className="w-3/4 lg:w-1/4 sm:w-2/4">
				<div className="text-center">
					<img src={logo} alt="logo" className={'w-full object-cover m-auto'}/>
					<h2 className="text-center text-2xl font-bold text-black my-4">
						Tizimga kirish
					</h2>
					<p>
						<a className="underline" href="tg://resolve?domain=xorijda_ishbot">@xorijdaishbot</a> telegram botiga kiring va 1 daqiqalik kodingizni oling
					</p>
				</div>
				
				<div className="mt-8">
					<form onSubmit={registerUser}>
						<div className="my-4">
							<input
								id="name"
								required
								type="text"
								name="name"
								placeholder="Kod"
								className="form-input"
								value={user.name}
								onChange={(e) => setUser({ ...user, name: e.target.value })}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
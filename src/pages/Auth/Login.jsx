import React from "react";
import { Link } from "react-router-dom";
import { register } from "../../auth/jwtService";
import { useState } from "react";
import { toast } from "react-toastify";
import logo from "../../assets/logo_header.png"

const Login = () => {
	
	const [isAgree, setIsAgree] = useState(false);
	
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
				</div>
				
				<div className="mt-8">
					<form onSubmit={registerUser}>
						<div className="my-4">
							<div className="flex justify-between">
								<label
									htmlFor="name"
									className="text-sm text-black"
								>
									Full name
								</label>
							</div>
							
							<input
								id="name"
								required
								type="text"
								name="name"
								placeholder="Name"
								className="form-input"
								value={user.name}
								onChange={(e) => setUser({ ...user, name: e.target.value })}
							/>
						</div>
						
						<div className="my-4">
							<div className="flex justify-between">
								<label
									htmlFor="email"
									className="text-sm text-gray-600 dark:text-gray-200"
								>
									Your email
								</label>
							</div>
							
							<input
								id="email"
								required
								type="email"
								name="name"
								placeholder="Email"
								className="form-input"
								value={user.email}
								onChange={(e) => setUser({ ...user, email: e.target.value })}
							/>
						</div>
						
						<div>
							<div className="flex justify-between">
								<label
									htmlFor="password"
									className="text-sm text-gray-600 dark:text-gray-200"
								>
									Your Password
								</label>
							</div>
							
							<input
								id="password"
								required
								type="password"
								name="password"
								placeholder="Your Password"
								className="form-input"
								value={user.password}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
							/>
						</div>
						
						<div className="flex items-center mt-3">
							<input
								id="default-checkbox"
								type="checkbox"
								className="w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
								value={isAgree}
								onChange={(e) => setIsAgree(e.target.checked)}
							/>
							<label
								htmlFor="default-checkbox"
								className="ml-2 text-sm text-black"
							>
								I accept the Terms and the Data Privacy Statement.
							</label>
						</div>
						
						<div className="mt-10">
							<button
								disabled={!isAgree}
								type="submit"
								className="btn btn-primary text-center w-full"
							>
								Kirish
							</button>
							
							<p className="mt-6 text-center text-sm text-gray-400">
								Are you already registered?
								<Link
									className="ml-1 text-primary hover:underline"
									to={"/"}
								>
									Login
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
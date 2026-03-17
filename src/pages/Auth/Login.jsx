import React, {useEffect} from "react";
import {loginUser} from "../../auth/jwtService";
import {useState} from "react";
import {toast} from "react-toastify";
import logo from "../../assets/Logo_Color.svg"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getUserDetail} from "../../redux/Slices/userDetailSlice/userDetailSlice.js";
import axios from "../../plugins/axios.js";

const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [login, setLogin] = useState(null)
	const [password, setPassword] = useState(null)

	const [visible, setVisible] = useState(false)

	const [popup, setPopup] = useState(null);
	const [activeTab, setActiveTab] = useState("credentials");

	// Cleanup popup and message listener on unmount
	useEffect(() => {
		return () => {
			if (popup && !popup.closed) popup.close();
		};
	}, [popup]);

	const loginFunc = (e) => {
		e.preventDefault();
		loginUser({login, password})?.then((res) => {
			if (res?.data?.auth_status === "done") {
				dispatch(getUserDetail())?.then(() => {
					navigate("/")
					toast.success("Successfully logged");
				})
			}
		})
			.catch((err) => {
				toast.error(err?.response?.data?.error || err?.message);
			});
	};

	// const handleGoogleLogin = async () => {
	//   await axios.get("/auth/google/start").then((response) => {
	//     console.log(response)
	//   })
	// };

	const handleGoogleLogin = async () => {
		try {
			// Fetch the Google auth URL from your backend
			const response = await axios.get("/auth/google/start");
			const url = response?.data?.authorize_url; // Adjust based on your API response

			if (!url) {
				toast.error("Failed to get Google login URL");
				return;
			}

			window.location.href = url

			// Open a centered popup
			// const width = 500;
			// const height = 600;
			// const left = window.screen.width / 2 - width / 2;
			// const top = window.screen.height / 2 - height / 2;
			// const popupWindow = window.open(
			//   url,
			//   "google-login",
			//   `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
			// );
			//
			// setPopup(popupWindow);
			//
			// // Listen for message from the popup (callback page)
			// const messageHandler = (event) => {
			//   // Security: verify origin matches your frontend origin
			//   if (event.origin !== window.location.origin) return;
			//
			//   const { type } = event.data || {};
			//   if (type === "google-auth-success") {
			//     // Handle successful login – you may receive user/token
			//     // Example: dispatch(setUser(user)); or store token
			//     toast.success("Google login successful");
			//     // Optionally dispatch getUserDetail if needed
			//     // dispatch(getUserDetail());
			//     navigate("/");
			//   } else if (type === "google-auth-error") {
			//     toast.error(event.data.error || "Google login failed");
			//   }
			//
			//   // Cleanup
			//   window.removeEventListener("message", messageHandler);
			//   if (popupWindow && !popupWindow.closed) popupWindow.close();
			// };
			//
			// window.addEventListener("message", messageHandler);
			//
			// // Optional: poll if popup is closed without message
			// const timer = setInterval(() => {
			//   if (popupWindow.closed) {
			//     clearInterval(timer);
			//     window.removeEventListener("message", messageHandler);
			//     toast.info("Google login cancelled");
			//   }
			// }, 500);
		} catch (error) {
			toast.error("Error initiating Google login");
			console.error(error);
		}
	};

	const handleMyIdLogin = () => {
		window.location.href = axios.defaults.baseURL + "/auth/myid/qr-code/state=getQrCode"
	}

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
					<div className="flex border-b mb-6">
						<button 
							type="button"
							onClick={() => setActiveTab("credentials")} 
							className={`flex-1 py-2 text-center transition-colors ${activeTab === "credentials" ? "border-b-2 border-[#3b82f6] text-[#3b82f6] font-bold" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
							<i className="fa-solid fa-user-lock mr-2"></i> Login/Parol
						</button>
						<button 
							type="button"
							onClick={() => setActiveTab("google")} 
							className={`flex-1 py-2 text-center transition-colors ${activeTab === "google" ? "border-b-2 border-[#3b82f6] text-[#3b82f6] font-bold" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
							<i className="fa-brands fa-google mr-2"></i> Google
						</button>
						<button 
							type="button"
							onClick={() => setActiveTab("myid")} 
							className={`flex-1 py-2 text-center transition-colors ${activeTab === "myid" ? "border-b-2 border-[#3b82f6] text-[#3b82f6] font-bold" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
							<i className="fa-solid fa-qrcode mr-2"></i> MyId
						</button>
					</div>

					{activeTab === "credentials" && (
						<form onSubmit={loginFunc}>
							<div className="my-4">
								<input
									id="login"
									required
									type="text"
									name="login"
									placeholder="Login"
									className="form-input"
									value={login || ""}
									onChange={(e) => setLogin(e.target.value?.toLowerCase()?.trim())}
								/>
							</div>
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
							<div className="my-4 text-end">
								<p>
									<span onClick={() => navigate("/register", {state: {forgot: true}})}
									      className="text-[#3b82f6] cursor-pointer font-bold">Login yoki parol</span> yodingizdan chiqdimi?
								</p>
							</div>
							<div className="my-4">
								<input
									id="confirm"
									required
									type="submit"
									name="confirm"
									className="btn btn-primary w-full"
									value={"Kirish"}
								/>
							</div>
						</form>
					)}

					{activeTab === "google" && (
						<div className="my-8">
							<button onClick={handleGoogleLogin} className="btn btn-primary w-full mb-4">
								<span className="mr-2"><i className="fa-brands fa-google"></i></span> Google orqali kirish
							</button>
						</div>
					)}

					{activeTab === "myid" && (
						<div className="my-8">
							<button onClick={handleMyIdLogin} className="btn btn-primary w-full mb-4">
								<span className="mr-2"><i className="fa-solid fa-qrcode"></i></span> Qr kod orqali kirish
							</button>
							<button onClick={() => navigate("/myid-sdk")} className="btn btn-primary w-full">
								<span className="mr-2"><i className="fa-solid fa-qrcode"></i></span> Face id orqali kirish
							</button>
						</div>
					)}
					<hr className="my-4 border border-gray-300 w-full h-[1px]"/>
					<div className="w-full text-center">
						<p className="mb-4">Tizimda profilingiz yo'qmi?</p>
						<button
							className="btn btn-primary mx-auto"
							onClick={() => navigate("/register")}
						>
							Ro'yhatdan o'ting
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
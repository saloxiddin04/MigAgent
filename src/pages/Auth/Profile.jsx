import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getCookie, getUserData, setUserData, updateUserAuth} from "../../auth/jwtService.js";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {getUserDetail, updateUser} from "../../redux/Slices/userDetailSlice/userDetailSlice.js";

const Profile = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	const [visible, setVisible] = useState(false)
	
	const [login, setLogin] = useState(null)
	const [password, setPassword] = useState(null)
	const [re_password, setRePassword] = useState(null)
	
	const [first_name, setFirstName] = useState(null)
	const [last_name, setLastNane] = useState(null)
	const [mid_name, setMidName] = useState(null)
	const [platform_usage, setPlatformUsage] = useState(null)
	const [work_abroad_status, setWorkAbroadStatus] = useState(null)
	
	useEffect(() => {
		if (JSON.parse(getCookie("auth_status") || "{}") === "done") {
			setFirstName(getUserData()?.first_name)
			setLastNane(getUserData()?.last_name)
			setMidName(getUserData()?.mid_name)
			setLogin(getUserData()?.login)
			setPlatformUsage(getUserData()?.platform_usage)
			setWorkAbroadStatus(getUserData()?.work_abroad_status)
		}
	}, [])
	
	const updateAuthUser = (e) => {
		e.preventDefault();
		
		if (password !== re_password) return toast.error("Parollar bir xil bo'lishi shart!")
		
		if (JSON.parse(getCookie("auth_status") || "{}") === "done") {
			dispatch(updateUser({first_name, last_name, mid_name, login, password, re_password, platform_usage, work_abroad_status}))?.then(() => {
				toast.success("Muvofaqqiyatli yangilandi!")
				dispatch(getUserDetail())?.then(({payload}) => {
					setUserData(payload)
				})
			})
		} else {
			updateUserAuth({
				first_name,
				last_name,
				mid_name,
				platform_usage,
				work_abroad_status,
				login,
				password,
				re_password
			})
				.then(() => {
					toast.success("Successfully");
					navigate("/")
				})
				.catch((err) => {
					toast.error(err?.response?.data?.error || err?.message);
				});
		}
	};
	
	return (
		<>
			<div className="w-full min-h-screen flex items-center justify-center bg-[rgb(248,249,250)]">
				<div className="w-3/4 lg:w-3/4 sm:w-3/4">
					<div className="mt-36">
						<form className="w-full flex justify-between flex-wrap" onSubmit={updateAuthUser}>
							
							<div className="my-4 lg:w-[49%] w-full">
								<div className="flex justify-between">
									<label
										htmlFor="login"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Login
									</label>
								</div>
								
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
							
							<div className="my-4 lg:w-[49%] w-full">
								<div className="flex justify-between">
									<label
										htmlFor="password"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Parol
									</label>
								</div>
								
								<div
									className="flex items-center gap-2 border w-full py-[10px] px-[25px] border-[#3b82f6] rounded-[8px] focus-within:shadow-[5px_5px_5px_rgba(0,0,0,0.3)] transition">
									<input
										id="password"
										required={JSON.parse(getCookie("auth_status") || "{}") !== "done"}
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
							</div>
							
							<div className="my-4 lg:w-[49%] w-full">
								<div className="flex justify-between">
									<label
										htmlFor="re_password"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Parol tasdiqlash
									</label>
								</div>
								
								<div
									className="flex items-center gap-2 border w-full py-[10px] px-[25px] border-[#3b82f6] rounded-[8px] focus-within:shadow-[5px_5px_5px_rgba(0,0,0,0.3)] transition">
									<input
										id="re_password"
										required={JSON.parse(getCookie("auth_status") || "{}") !== "done"}
										type={visible ? "text" : "password"}
										name="re_password"
										placeholder="Parol"
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
							</div>
							
							<div className="my-4 lg:w-[49%] w-full">
								<div className="flex justify-between">
									<label
										htmlFor="name"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Ismingiz
									</label>
								</div>
								
								<input
									id="name"
									required
									type="text"
									name="name"
									placeholder="Ismingiz"
									className="form-input"
									value={first_name || ""}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							
							<div className="my-4 lg:w-[49%] w-full">
								<div className="flex justify-between">
									<label
										htmlFor="surname"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Familiyangiz
									</label>
								</div>
								
								<input
									id="surname"
									required
									type="text"
									name="surname"
									placeholder="Familiyangiz"
									className="form-input"
									value={last_name || ""}
									onChange={(e) => setLastNane(e.target.value)}
								/>
							</div>
							
							<div className="my-4 lg:w-[49%] w-full">
								<div className="flex justify-between">
									<label
										htmlFor="midname"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Sharifingiz
									</label>
								</div>
								
								<input
									id="midname"
									required
									type="text"
									name="midname"
									placeholder="Sharifingiz"
									className="form-input"
									value={mid_name || ""}
									onChange={(e) => setMidName(e.target.value)}
								/>
							</div>
							
							<div className="my-4 lg:w-[49%] w-full">
								<div className="flex justify-between">
									<label
										htmlFor="country"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Davlat tanlash (Yashash manzil)
									</label>
								</div>
								
								<select
									name="country"
									id="country"
									className="form-input"
									// disabled={JSON.parse(getCookie("auth_status") || "null") === "done"}
									// required
								>
									<option value="">Tanlang...</option>
									<option value="">O'zbekiston</option>
								</select>
							</div>
							
							<div className="my-4 lg:w-[49%] w-full">
								<div className="flex justify-between">
									<label
										htmlFor="country"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Viloyat tanlash
									</label>
								</div>
								
								<select
									name="country"
									id="country"
									className="form-input"
									// disabled={JSON.parse(getCookie("auth_status") || "null") === "done"}
									// required
								>
									<option value="">Tanlang...</option>
									<option value="">Toshkent sh</option>
									<option value="">Toshkent viloyati</option>
								</select>
							</div>
							
							<div className="my-4 lg:w-[49%] w-full">
								<div className="flex justify-between">
									<label
										htmlFor="country"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Tuman tanlash
									</label>
								</div>
								
								<select
									name="country"
									id="country"
									className="form-input"
									// disabled={JSON.parse(getCookie("auth_status") || "null") === "done"}
									// required
								>
									<option value="">Tanlang...</option>
									<option value="">Yunusobod tumani</option>
								</select>
							</div>
							
							<div className="my-4 lg:w-[49%] w-full">
								<div className="flex justify-between">
									<label
										htmlFor="phone_number"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Manzil kiritish
									</label>
								</div>
								
								<input
									id="phone_number"
									// required
									type="text"
									name="phone_number"
									placeholder="Manzil kiritish"
									className="form-input"
									// disabled={JSON.parse(getCookie("auth_status") || "null") === "done"}
									// value={user.name}
									// onChange={(e) => setUser({...user, name: e.target.value})}
								/>
							</div>
							
							<div className="lg:w-[49%] w-full">
								<div>
									<label
										htmlFor="default-checkbox"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Hozirda chet davlatda ishlaysizmi?
									</label>
								</div>
								<div className="flex items-center">
									<input
										id="work_abroad_status0"
										type="checkbox"
										className="w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
										checked={work_abroad_status === 0}
										onChange={() => setWorkAbroadStatus(0)}
										// disabled={JSON.parse(getCookie("auth_status") || "null") === "done"}
									/>
									<label
										htmlFor="work_abroad_status0"
										className="ml-2 text-sm text-black"
									>
										Xa
									</label>
								</div>
								<div className="flex items-center mt-1">
									<input
										id="work_abroad_status1"
										type="checkbox"
										className="w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
										checked={work_abroad_status === 1}
										onChange={() => setWorkAbroadStatus(1)}
										// disabled={JSON.parse(getCookie("auth_status") || "null") === "done"}
									/>
									<label
										htmlFor="work_abroad_status1"
										className="ml-2 text-sm text-black"
									>
										Yo'q
									</label>
								</div>
								<div className="flex items-center mt-1">
									<input
										id="work_abroad_status2"
										type="checkbox"
										className="w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
										checked={work_abroad_status === 2}
										onChange={() => setWorkAbroadStatus(2)}
										// disabled={JSON.parse(getCookie("auth_status") || "null") === "done"}
									/>
									<label
										htmlFor="work_abroad_status2"
										className="ml-2 text-sm text-black"
									>
										Ishlash istagim bor
									</label>
								</div>
							</div>
							
							<div className="lg:w-[49%] w-full">
								<div className="mt-2">
									<label
										htmlFor="default-checkbox"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Nega bu platformadan foydalanmoqchisiz?
									</label>
								</div>
								<div className="flex items-center mt-1">
									<input
										id="platform_usage0"
										type="checkbox"
										className="w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
										checked={platform_usage === 0}
										onChange={() => setPlatformUsage(0)}
										// disabled={JSON.parse(getCookie("auth_status") || "null") === "done"}
									/>
									<label
										htmlFor="platform_usage0"
										className="ml-2 text-sm text-black"
									>
										Rus tili (patent) imtihonlariga tayyorlanish uchun
									</label>
								</div>
								<div className="flex items-center mt-3">
									<input
										id="platform_usage1"
										type="checkbox"
										className="w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
										checked={platform_usage === 1}
										onChange={() => setPlatformUsage(1)}
										// disabled={JSON.parse(getCookie("auth_status") || "null") === "done"}
									/>
									<label
										htmlFor="platform_usage1"
										className="ml-2 text-sm text-black"
									>
										Bilimimni sinab ko'rish uchun
									</label>
								</div>
							</div>
							
							<div className="my-4 w-full flex justify-end">
								<input
									className="btn btn-primary"
									value={"Saqlash"}
									type="submit"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
import React, {useState} from 'react';
import logo from "../../assets/Logo_Color.svg";
import instance from "../../plugins/axios.js";
import axios from "../../plugins/axios.js";
import moment from "moment";

const MyIdSdk = () => {
	const [pass_data, setPassData] = useState(null)
	const [birth_date, setBirthday] = useState(null)
	const [is_resident, setIsResident] = useState(true)

	const handleLoginSdk = async (e) => {
		e.preventDefault()
		if (!pass_data || !birth_date) return;
		await axios.get("/auth/myid/sdk", {params: {state: "web-sdk-state", pass_data, birth_date, is_resident: is_resident ? 1 : 0}}).then((response) => {
			window.location.href = response?.data?.uri
		})
	}

	return (
		<div>
			<div className="w-full min-h-screen flex items-center justify-center bg-[rgb(248,249,250)]">
				<div className="w-3/4 lg:w-1/4 sm:w-2/4">
					<div className="text-center">
						<img src={logo} alt="logo" className={'w-full object-cover m-auto'}/>
						<h2 className="text-center text-2xl font-bold text-black my-4">
							Face id orqali tizimga kirish
						</h2>
					</div>

					<div className="mt-8">
						<form onSubmit={handleLoginSdk}>
							<div className="my-4">
								<input
									id="login"
									required
									type="text"
									name="login"
									placeholder="AB1234567"
									className="form-input"
									value={pass_data || ""}
									onChange={(e) => setPassData(e.target.value)}
								/>
							</div>
							<div
								className="my-4 flex items-center gap-2 border w-full py-[10px] px-[25px] border-[#3b82f6] rounded-[8px] focus-within:shadow-[5px_5px_5px_rgba(0,0,0,0.3)] transition">
								<input
									id="birtday"
									required
									type={"date"}
									name="birtday"
									placeholder="Tugilgan kun"
									className="w-full outline-none bg-transparent"
									value={birth_date || ""}
									onChange={(e) => setBirthday(moment(e.target.value).format("YYYY-MM-DD"))}
								/>
							</div>
							<div className="my-4 flex items-center mb-6">
								<input 
									type="checkbox" 
									id="residentCheckbox" 
									className="mr-2 h-4 w-4 text-[#3b82f6] focus:ring-[#3b82f6] border-gray-300 rounded cursor-pointer" 
									checked={is_resident}
									onChange={(e) => setIsResident(e.target.checked)}
								/>
								<label htmlFor="residentCheckbox" className="text-sm font-medium text-gray-700 cursor-pointer">O'zbekiston fuqarosi</label>
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyIdSdk;
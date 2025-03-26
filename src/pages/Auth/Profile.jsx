import React from 'react';

const Profile = () => {
	return (
		<>
			<div className="w-full min-h-screen flex items-center justify-center bg-[rgb(248,249,250)]">
				<div className="w-3/4 lg:w-1/4 sm:w-2/4">
					<div className="mt-8">
						<form>
							<div className="my-4">
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
									// value={user.name}
									// onChange={(e) => setUser({...user, name: e.target.value})}
								/>
							</div>
							
							<div className="my-4">
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
									// value={user.name}
									// onChange={(e) => setUser({...user, name: e.target.value})}
								/>
							</div>
							
							<div className="my-4">
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
									// value={user.name}
									// onChange={(e) => setUser({...user, name: e.target.value})}
								/>
							</div>
							
							<div className="my-4">
								<div className="flex justify-between">
									<label
										htmlFor="phone_number"
										className="text-sm text-blue-400 ml-4 mb-1"
									>
										Telefon raqam
									</label>
								</div>
								
								<input
									id="phone_number"
									required
									type="text"
									name="phone_number"
									placeholder="Telefon raqam"
									className="form-input"
									// value={user.name}
									// onChange={(e) => setUser({...user, name: e.target.value})}
								/>
							</div>
							
							<div className="my-4">
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
								>
									<option value="">Tanlang...</option>
									<option value="">O'zbekiston</option>
								</select>
							</div>
							
							<div>
								<label
									htmlFor="default-checkbox"
									className="text-sm text-blue-400 ml-4 mb-1"
								>
									Nega bu platformadan foydalanmoqchisiz?
								</label>
							</div>
							
							<div className="flex items-center mt-1">
								<input
									id="default-checkbox"
									type="checkbox"
									className="w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
									// value={isAgree}
									// onChange={(e) => setIsAgree(e.target.checked)}
								/>
								<label
									htmlFor="default-checkbox"
									className="ml-2 text-sm text-black"
								>
									Rus tili (patent) imtihonlariga tayyorlanish uchun
								</label>
							</div>
							<div className="flex items-center mt-3">
								<input
									id="default-checkbox"
									type="checkbox"
									className="w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-200 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
									// value={isAgree}
									// onChange={(e) => setIsAgree(e.target.checked)}
								/>
								<label
									htmlFor="default-checkbox"
									className="ml-2 text-sm text-black"
								>
									Bilimimni sinab ko'rish uchun
								</label>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
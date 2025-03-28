import axios from "axios";
import {getAccessToken, logout} from "../auth/jwtService.js";

const instance = axios.create({
	// baseURL: import.meta.env.VITE_API_URL_DEVELOP,
	baseURL: "http://api-xorijdaish.asilbro.uz/",
	timeout: 20000,
	headers: {
		Accept: "application/json"
	}
})

instance.interceptors.request.use(
	(config) => {
		let token = getAccessToken()
		if (token && config.headers) {
			config.headers.Authorization = "Bearer " + token;
		}
		
		return config;
	},
	(error) => {
		return Promise.reject(error)
	}
)

instance.interceptors.request.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			if (
				window.location.pathname !== "/login" &&
				window.location.pathname !== "/register"
			) {
				window.location.href = "/login";
				logout()
			}
		}
		
		return Promise.reject(error)
	}
)

export default instance
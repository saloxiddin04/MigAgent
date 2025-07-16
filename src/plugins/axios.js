import axios from "axios";
import {getAccessToken, logout} from "../auth/jwtService.js";

export const api_url = "https://cabinet-test.xorijdaish.uz"
// export const api_url = "http://api-xorijdaish.asilbro.uz"

const instance = axios.create({
	// baseURL: import.meta.env.VITE_API_URL_DEVELOP,
	baseURL: api_url,
	timeout: 20000,
	headers: {
		Accept: "application/json"
	}
})

instance.interceptors.request.use(
	(config) => {
		const token = getAccessToken();
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			if (error.response.status === 401) {
				logout();
				if (window.location.pathname !== "/login") {
					window.location.href = "/";
				}
			}
		}
		return Promise.reject(error);
	}
);

export default instance
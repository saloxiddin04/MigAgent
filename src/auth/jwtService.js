import instance from "../plugins/axios.js";

export function login(args) {
	return instance.post("login", ...args).then((res) => {
		setAccessToken(res.data.access);
		setRefreshToken(res.data.refresh);
		setUserData(res.data.data);
	})
}

export function register(args) {
	return instance.post("register", ...args)
}

export function logout() {
	document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function setAccessToken(value) {
	setCookie("access", value, 7);
}

export function getAccessToken() {
	return getCookie("access");
}

export function setRefreshToken(value) {
	setCookie("refresh", value, 7);
}

export function getRefreshToken() {
	return getCookie("refresh");
}

export function setUserData(value) {
	setCookie("user", JSON.stringify(value), 7);
}

export function getUserData() {
	const cookies = document.cookie.split(";");
	const userCookie = cookies.find((cookie) => cookie.includes("user="));
	
	if (userCookie) return JSON.parse(userCookie.split("=")[1] || '{}');
}

export function setCookie(name, value, expirationDays) {
	const date = new Date();
	date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
	const cookieString = document.cookie;
	const cookieArray = cookieString.split("; ");
	for (const cookie of cookieArray) {
		const [key, value] = cookie.split("=");
		if (key === name) {
			return value;
		}
	}
	return null;
}
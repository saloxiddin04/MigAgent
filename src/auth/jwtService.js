import instance from "../plugins/axios.js";

export function verifyCode(args) {
	return instance.post("/auth/confirm-verify-code", args)?.then((res) => {
		setAccessToken(res?.data?.token?.access);
		setRefreshToken(res?.data?.token?.refresh_token);
		setCookie("auth_status", JSON.stringify(res?.data?.auth_status));
		setCookie("user_roles", JSON.stringify(res?.data?.user_roles));
		return res;
	})
}

export function updateUserAuth(args) {
	return instance.put("/auth/update-user-auth", args)?.then((res) => {
		setUserData(res?.data?.user)
		setCookie("auth_status", JSON.stringify(res?.data?.auth_status));
	})
}

export function logout() {
	document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "auth_status=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "user_roles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	window.location.reload()
	window.location.href = "/"
}

export function setAccessToken(value) {
	setCookie("access", value, 1);
}

export function getAccessToken() {
	return getCookie("access");
}

export function setRefreshToken(value) {
	setCookie("refresh", value, 1);
}

export function getRefreshToken() {
	return getCookie("refresh");
}

export function setUserData(value) {
	setCookie("user", JSON.stringify(value), 1);
}

export function getUserData() {
	const cookies = document?.cookie?.split(";");
	const userCookie = cookies?.find((cookie) => cookie?.includes("user="));
	
	if (userCookie) return JSON.parse(userCookie?.split("=")[1] || '{}');
}

export function setCookie(name, value, expirationDays) {
	const date = new Date();
	date?.setTime(date?.getTime() + expirationDays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + date?.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name) {
	const cookieString = document.cookie;
	const cookieArray = cookieString?.split("; ");
	for (const cookie of cookieArray) {
		const [key, value] = cookie.split("=");
		if (key === name) {
			return value;
		}
	}
	return null;
}
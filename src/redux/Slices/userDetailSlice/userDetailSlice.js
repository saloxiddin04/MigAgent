import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../plugins/axios.js";
import {getUserData, setUserData} from "../../../auth/jwtService.js";

const initialState = {
	loading: false,
	user: getUserData() || null,
	countries: null,
	districts: null
}

export const getUserDetail = createAsyncThunk(
	"user/getUserDetail",
	async () => {
		try {
			const response = await instance.get("user/detail")
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const updateUser = createAsyncThunk(
	"user/updateUser",
	async (data) => {
		try {
			const response = await instance.patch("user/update", data)
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const getCountriesRegions = createAsyncThunk(
	"user/getCountriesRegions",
	async () => {
		try {
			const response = await instance.get("user/get-countries-regions")
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const getDistricts = createAsyncThunk(
	"user/getDistricts",
	async (id) => {
		try {
			const response = await instance.get(`user/get-districts/${id}`)
			return response.data
		} catch (e) {
			return e;
		}
	}
)

const userDetailSlice = createSlice({
	name: "user",
	initialState,
	extraReducers: builder => {
		builder
			.addCase(getUserDetail.pending, (state) => {
				state.loading = true
			})
			.addCase(getUserDetail.fulfilled, (state, {payload}) => {
				state.user = payload
				setUserData(payload)
				state.loading = false
			})
			.addCase(getUserDetail.rejected, (state) => {
				state.loading = false
			})
		
		// updateUser
		builder
			.addCase(updateUser.pending, (state) => {
				state.loading = true
			})
			.addCase(updateUser.fulfilled, (state) => {
				state.loading = false
			})
			.addCase(updateUser.rejected, (state) => {
				state.loading = false
			})

		// getCountriesRegions
		builder
			.addCase(getCountriesRegions.pending, (state) => {
				state.loading = true
			})
			.addCase(getCountriesRegions.fulfilled, (state, {payload}) => {
				state.loading = false
				state.countries = payload
			})
			.addCase(getCountriesRegions.rejected, (state) => {
				state.loading = false
				state.countries = null
			})

		// getDistricts
		builder
			.addCase(getDistricts.pending, (state) => {
				state.loading = true
			})
			.addCase(getDistricts.fulfilled, (state, {payload}) => {
				state.loading = false
				state.districts = payload
			})
			.addCase(getDistricts.rejected, (state) => {
				state.loading = false
				state.districts = null
			})
	}
})

export default userDetailSlice.reducer
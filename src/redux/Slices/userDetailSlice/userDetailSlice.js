import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../plugins/axios.js";
import {getUserData, setUserData} from "../../../auth/jwtService.js";

const initialState = {
	loading: false,
	user: getUserData() || null,
	countries: null,
	districts: null,
	dashboard: null
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

export const getDashboard = createAsyncThunk(
	"user/getDashboard",
	async () => {
		try {
			const response = await instance("user/client-dashboard")
			return response.data
		} catch (e) {
			return e;
		}
	}
)

const userDetailSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setDistricts: (state, {payload}) => {
			state.districts = payload
		}
	},
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
		
		// getDashboard
		builder
			.addCase(getDashboard.pending, (state) => {
				state.loading = true
			})
			.addCase(getDashboard.fulfilled, (state, {payload}) => {
				state.loading = false
				state.dashboard = payload
			})
			.addCase(getDashboard.rejected, (state) => {
				state.loading = false
				state.dashboard = null
			})
	}
})

export const { setDistricts } = userDetailSlice.actions;
export default userDetailSlice.reducer
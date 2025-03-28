import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../plugins/axios.js";
import {getUserData, setUserData} from "../../../auth/jwtService.js";

const initialState = {
	loading: false,
	user: getUserData() || null
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
			.addCase(updateUser.fulfilled, (state, {payload}) => {
				state.loading = false
			})
			.addCase(updateUser.rejected, (state) => {
				state.loading = false
			})
	}
})

export default userDetailSlice.reducer
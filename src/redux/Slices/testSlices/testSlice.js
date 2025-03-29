import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../plugins/axios.js";

const initialState = {
	categories: null,
	questions: null,
	loading: false
}

export const getCategories = createAsyncThunk(
	"test/getCategories",
	async () => {
		try {
			const response = await instance.get("/assessments/get-categories")
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const getTestsByVariant = createAsyncThunk(
	"test/getTestsByVariant",
	async (params) => {
		try {
			const response = await instance.get(`/assessments/get-questions/${params}`)
			return response.data
		} catch (e) {
			return e;
		}
	}
)

const testSlice = createSlice({
	name: "test",
	initialState,
	reducers: {
		clearQuestions: (state) => {
			state.questions = null
		}
	},
	extraReducers: builder => {
		// getCategories
		builder
			.addCase(getCategories.pending, (state) => {
				state.loading = true
			})
			.addCase(getCategories.fulfilled, (state, {payload}) => {
				state.categories = payload
				state.loading = false
			})
			.addCase(getCategories.rejected, (state) => {
				state.categories = null
				state.loading = false
			})
		
		// getTestsByVariant
		builder
			.addCase(getTestsByVariant.pending, (state) => {
				state.loading = true
			})
			.addCase(getTestsByVariant.fulfilled, (state, {payload}) => {
				state.questions = payload
				state.loading = false
			})
			.addCase(getTestsByVariant.rejected, (state) => {
				state.questions = null
				state.loading = false
			})
	}
})

export const {clearQuestions} = testSlice.actions
export default testSlice.reducer
import {configureStore} from "@reduxjs/toolkit";
import userDetailSlice from "./Slices/userDetailSlice/userDetailSlice.js";
import testSlice from "./Slices/testSlices/testSlice.js";

export const store = configureStore({
	reducer: {
		user: userDetailSlice,
		test: testSlice
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})
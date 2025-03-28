import {configureStore} from "@reduxjs/toolkit";
import userDetailSlice from "./Slices/userDetailSlice/userDetailSlice.js";

export const store = configureStore({
	reducer: {
		user: userDetailSlice
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})
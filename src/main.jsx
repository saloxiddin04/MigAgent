import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			{/* <StrictMode> */}
			<App />
			{/* </StrictMode> */}
		</BrowserRouter>
	</Provider>
);

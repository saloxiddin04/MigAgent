import React from 'react';
import {ToastContainer} from "react-toastify";
import {Route, Routes, useLocation} from "react-router-dom";
import Main from "./pages/Main/Main.jsx";
import Profile from "./pages/Auth/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Test from "./pages/Test/Test.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Forgot from "./pages/Auth/Forgot.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
// import {getUserData} from "./auth/jwtService.js";

const App = () => {

  const {pathname} = useLocation()
  // const navigate = useNavigate()

  // useEffect(() => {
  // 	if (!getUserData() && (pathname !== "/login" || pathname !== "/profile")) {
  // 		navigate("/");
  // 	}
  // }, [navigate, pathname]);

  return (
    <>
      {/*{pathname !== "/login" && <Navbar/>}*/}

      {/*<Routes>*/}
      {/*	<Route path="/" element={<Main/>} />*/}
      {/*	<Route path="/login" element={<Login/>} />*/}
      {/*	<Route path="/profile" element={<Profile/>} />*/}
      {/*	<Route path="/test" element={<Test/>} />*/}
      {/*</Routes>*/}

      {/*{pathname !== "/login" && <Footer/>}*/}

      {/*<ToastContainer*/}
      {/*	autoClose={2000}*/}
      {/*	hideProgressBar={true}*/}
      {/*	theme="colored"*/}
      {/*	position="bottom-left"*/}
      {/*/>*/}

      <div className="app-container">
        {pathname !== "/login" && pathname !== "/register" && pathname !== "/forgot" && <Navbar/>}

        <div className="content">
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/forgot" element={<Forgot/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>

        {pathname !== "/login" && pathname !== "/register" && pathname !== "/forgot" && <Footer/>}

        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          theme="colored"
          position="bottom-left"
        />
      </div>
    </>
  );
};

export default App;
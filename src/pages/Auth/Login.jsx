import React from "react";
import {loginUser} from "../../auth/jwtService";
import {useState} from "react";
import {toast} from "react-toastify";
import logo from "../../assets/logo_header.png"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getUserDetail} from "../../redux/Slices/userDetailSlice/userDetailSlice.js";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, setLogin] = useState(null)
  const [password, setPassword] = useState(null)

  const [visible, setVisible] = useState(false)

  const loginFunc = (e) => {
    e.preventDefault();
    loginUser({login, password})?.then((res) => {
      if (res?.data?.auth_status === "done") {
        dispatch(getUserDetail())?.then(() => {
          navigate("/")
          toast.success("Successfully logged");
        })
      }
    })
      .catch((err) => {
        toast.error(err?.response?.data?.error || err?.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[rgb(248,249,250)]">
      <div className="w-3/4 lg:w-1/4 sm:w-2/4">
        <div className="text-center">
          <img src={logo} alt="logo" className={'w-full object-cover m-auto'}/>
          <h2 className="text-center text-2xl font-bold text-black my-4">
            Tizimga kirish
          </h2>
        </div>

        <div className="mt-8">
          <form onSubmit={loginFunc}>
            <div className="my-4">
              <input
                id="login"
                required
                type="text"
                name="login"
                placeholder="Login"
                className="form-input"
                value={login || ""}
                onChange={(e) => setLogin(e.target.value?.toLowerCase()?.trim())}
              />
            </div>
            <div className="my-4 flex items-center gap-2 border w-full py-[10px] px-[25px] border-[#3b82f6] rounded-[8px] focus-within:shadow-[5px_5px_5px_rgba(0,0,0,0.3)] transition">
              <input
                id="password"
                required
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Parol"
                className="w-full outline-none"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value?.trim())}
              />
              <span onClick={() => setVisible(!visible)}>
                {
                  visible
                    ?
                    <i className="fa fa-eye text-[#3b82f6]" aria-hidden="true"></i>
                    :
                    <i className="fa fa-eye-slash text-[#3b82f6]" aria-hidden="true"></i>
                }
              </span>
            </div>
            <div className="my-4 text-end">
              <p>
                <span onClick={() => navigate("/register", {state: {forgot: true}})} className="text-[#3b82f6] cursor-pointer font-bold">Login yoki parol</span> yodingizdan chiqdimi?
              </p>
            </div>
            <div className="my-4">
              <input
                id="confirm"
                required
                type="submit"
                name="confirm"
                className="btn btn-primary w-full"
                value={"Kirish"}
              />
            </div>
          </form>
          <hr className="my-4 border border-gray-300 w-full h-[1px]"/>
          <div className="w-full flex justify-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/register")}
            >
              Ro'yhatdan o'ting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
import axios from "axios";
import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import ErrorMessage from "../component/ErrorMessage";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRedux } from "../redux/slice/userSlice";
import { loadUserCart } from "../redux/slice/productSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "Pa$$w0rd!",
  });

  const [formError, setFormError] = useState({});

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

    setFormError((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError({});
    try {
      const response = await axios.post(
        // `http://localhost:7000/api/auth/login`,
        `https://e-commerce-backend-6kxk.onrender.com/api/auth/login`,
        data
      );

      const resData = response.data;

      // 1. Save to localStorage before dispatching actions
      localStorage.setItem("user", JSON.stringify(resData));
      localStorage.setItem("token", resData.token);

      // 2. Dispatch Redux actions
      dispatch(loginRedux(resData));
      dispatch(loadUserCart(resData.user.email)); // Load user's cart

      toast.success("Logged in successfully");
      navigate("/");

    } catch (err) {
      const responseData = err?.response?.data;

      if (responseData?.errors && Array.isArray(responseData.errors)) {
        const dynamicErrors = {};
        responseData.errors.forEach((error) => {
          dynamicErrors[error.field] = error.msg;
        });
        setFormError(dynamicErrors);
      } else {
        toast.error(responseData?.msg || "Something went wrong. Try again later.");
      }
    }
  };

  return (
    <>
      <div className="p-3 md:p-4">
        <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
          <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
            <img src={loginSignupImage} className="w-full" alt="login" />
          </div>

          <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data.email}
              onChange={handleOnChange}
            />
            {formError.email && <ErrorMessage msg={formError.email} />}

            <label htmlFor="password">Password</label>
            <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full bg-slate-200 border-none outline-none"
                value={data.password}
                onChange={handleOnChange}
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
            {formError.password && <ErrorMessage msg={formError.password} />}

            <button
              className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
              type="submit"
            >
              Login
            </button>
          </form>

          <p className="text-left text-sm mt-2">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-red-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </>
  );
}

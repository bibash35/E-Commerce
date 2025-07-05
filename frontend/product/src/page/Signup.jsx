import axios from "axios";
import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [formError, setFormError] = useState({});

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormError((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (updatedErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError({}); // clear previous errors

    axios
      // .post(`http://localhost:7000/api/auth/signup`, data)
      .post(`https://e-commerce-backend-6kxk.onrender.com/api/auth/signup`, data)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        const responseData = err?.response?.data;

        // If backend returns array of validation errors
        if (Array.isArray(responseData?.errors)) {
          const backendErrors = {};
          responseData.errors.forEach((error) => {
            backendErrors[error.field] = error.msg;
          });
          setFormError(backendErrors);
        } else {
          // General error
          setFormError({ general: responseData?.msg || "Signup failed" });
        }

        console.error("Signup Error:", responseData);
      });
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img src={loginSignupImage} className="w-full h-full" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          {/* First Name */}
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleOnChange}
          />
          {formError.firstName && (
            <span className="text-red-500 text-sm">{formError.firstName}</span>
          )}

          {/* Last Name */}
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}
          />
          {formError.lastName && (
            <span className="text-red-500 text-sm">{formError.lastName}</span>
          )}

          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />
          {formError.email && (
            <span className="text-red-500 text-sm">{formError.email}</span>
          )}

          {/* Role */}
          <label htmlFor="role">Role</label>
          <select
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            name="role"
            value={data.role}
            onChange={handleOnChange}
          >
            <option value="">Select Role</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
          {formError.role && (
            <span className="text-red-500 text-sm">{formError.role}</span>
          )}

          {/* Password */}
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
          {formError.password && (
            <span className="text-red-500 text-sm">{formError.password}</span>
          )}

          {/* Confirm Password */}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {formError.confirmPassword && (
            <span className="text-red-500 text-sm">
              {formError.confirmPassword}
            </span>
          )}

          {/* General Error (optional) */}
          {formError.general && (
            <div className="text-red-500 text-sm text-center my-2">
              {formError.general}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Signup
          </button>
        </form>

        {/* Footer */}
        <p className="text-left text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

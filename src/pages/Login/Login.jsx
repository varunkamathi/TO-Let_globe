import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/store/authSlice";

import { FaLock } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

import "./Login.css";

import { API } from "../../config/axios";

const Login = ({ setUserInfo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFocus = (e) => {
    e.target.previousElementSibling.classList.add("glowIcon");
  };

  const handleBlur = (e) => {
    e.target.previousElementSibling.classList.remove("glowIcon");
  };

  const inputs = document.querySelectorAll(".input_text");
  inputs.forEach((input) => {
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login", {
        email,
        password,
      });

      //     console.log(res.data);
      console.log(res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("User", res.data.user.role);
        localStorage.setItem("userType", res.data.user.userType);
        localStorage.setItem("userId", res.data.user.id);
        // console.log(res.data.user);
        dispatch(
          login({
            token: res.data.token,
            userData: {
              id: res.data.user.id,
              firstName: res.data.user.firstName,
              lastName: res.data.user.lastName,
              email: res.data.user.email,
              role: res.data.user.role,
              profilePicture: res.data.user.profilePicture,
            },
          })
        );
        toast.success("Login success");
        navigate("/landlord-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error.response.data);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="login_form_container">
          <div className="login_form">
            <h2 className="text-2xl font-semibold">Login</h2>
            <div className="input_group">
              <AiOutlineMail className="ml-3 text-white " />
              <input
                type="email"
                placeholder="Email"
                className="input_text"
                autoComplete="off"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input_group">
              <FaLock className="ml-3 text-white" />
              <input
                type="password"
                placeholder="Password"
                className="input_text"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="exampleInputPassword1"
                required
              />
            </div>
            <div className="button_group" id="login_button">
              <button type="submit" onSubmit={handleSubmit}>
                LOGIN
              </button>
            </div>
            <div className="fotter">
              <a onClick={() => navigate("/forgot-password")}>
                Forgot Password ?
              </a>
              <a onClick={() => navigate("/register")}>Register</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

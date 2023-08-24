import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCtx } from "../store/userContext";

function Login() {
  const [detail, setDetail] = useState({ email: "", password: "" });
  const [validPassword, setValidPassword] = useState({
    valid: false,
    active: false,
  });
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();
  const ctx = useCtx();
  const VALID_PASSWORD =
    "A valid password must contain 8 alphanumeric characters with atleast 1 number(0-9) & alphabet(a-z).";

  useEffect(() => {
    const password = detail.password;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    if (password.trim().length >= 8 && passwordRegex.test(password)) {
      setValidPassword({ valid: true, active: true });
    } else {
      setValidPassword({ ...validPassword, valid: false });
    }
  }, [detail.password]);

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/");
    }
  }, []);

  function focusHandler() {
    setValidPassword({ ...validPassword, active: true });
  }
  async function submitHandler(e) {
    e.preventDefault();
    const laodingToast = toast.loading("Logging in...");
    const data = {
      email: detail.email,
      password: detail.password,
      returnSecureToken: true,
    };
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
          import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const jsonResponse = await res.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      setResponseData(jsonResponse);
      await ctx.login(jsonResponse.localId);
      toast.success("Logged in successfully!", {
        id: laodingToast,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
      console.log("successfully logged in!", jsonResponse);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        id: laodingToast,
      });
    }
  }
  return (
    <>
      <Toaster />
      <div className="flex flex-col justify-center items-center text-xl border border-solid border-white rounded-lg py-6 px-4 shadow-xl shadow-slate-900">
        <h1 className="font-extrabold text-3xl tracking-wide">Login</h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-center items-center gap-4 mt-8"
        >
          <input
            type="email"
            value={detail.email}
            onChange={(e) => setDetail({ ...detail, email: e.target.value })}
            placeholder="Email"
            required
            className="py-1 px-2 outline-none rounded text-white bg-[#242424] border-[2px] border-solid border-white"
          />
          <input
            type="password"
            value={detail.password}
            onChange={(e) => setDetail({ ...detail, password: e.target.value })}
            onBlur={focusHandler}
            placeholder="Password"
            required
            className={`py-1 px-2 outline-none rounded text-white bg-[#242424] border-[2px] border-solid ${
              !validPassword.valid && validPassword.active
                ? "border-red-500"
                : "border-white"
            }`}
          />
          {!validPassword.valid && validPassword.active ? (
            <p className="text-red-500 text-[10px] leading-3 font-medium max-w-[300px] text-center">
              {VALID_PASSWORD}
            </p>
          ) : (
            <></>
          )}
          <button
            type="submit"
            disabled={validPassword.active && !validPassword.valid}
            className={`w-full bg-green-700 font-semibold rounded mt-2 py-1 px-2 ${
              !validPassword.valid && validPassword.active
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-1">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-sm underline">
            signup here
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;

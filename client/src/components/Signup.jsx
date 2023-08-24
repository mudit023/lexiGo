import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCtx } from "../store/userContext";

function Signup() {
  const [detail, setDetail] = useState({
    email: "",
    password: "",
    language: "",
  });
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
    const laodingToast = toast.loading("Signing up...");
    console.log("language:", detail.language);
    const data = {
      email: detail.email,
      password: detail.password,
      returnSecureToken: true,
    };
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
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
      const obj = {
        email: detail.email,
        token: jsonResponse.localId,
        language: detail.language,
      };
      await ctx.signup(obj);
      toast.success("Signed up successfully!", {
        id: laodingToast,
      });
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
      console.log("successfully signed up!", jsonResponse);
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
        <h1 className="font-extrabold text-3xl tracking-wide">Signup</h1>
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
          <select
            name="language"
            id="lan-select"
            onChange={(e) => setDetail({ ...detail, language: e.target.value })}
            required
            className="bg-[#242424] border-[2px] border-solid border-white rounded"
          >
            <option value="" className="bg-[#242424]">
              Choose a language
            </option>
            <option value="english" className="bg-[#242424]">
              English
            </option>
            <option value="hindi" className="bg-[#242424]">
              Hindi
            </option>
          </select>
          <button
            type="submit"
            disabled={validPassword.active && !validPassword.valid}
            className={`w-full bg-green-700 font-semibold rounded mt-2 py-1 px-2 ${
              !validPassword.valid && validPassword.active
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            Signup
          </button>
        </form>
        <p className="text-sm mt-1">
          Already have an account?{" "}
          <Link to={"/login"} className="text-sm underline">
            login here
          </Link>
        </p>
      </div>
    </>
  );
}

export default Signup;

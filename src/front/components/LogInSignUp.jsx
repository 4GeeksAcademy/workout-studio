import React, { useState } from "react";
import image from "../assets/img/LOGO HORIZONTAL/Recurso 9ldpi.png";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const LogInSignUp = () => {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const { store, dispatch } = useGlobalReducer();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const handleInputs = (e) => {
    const key = e.target.id;
    setCredentials({
      ...credentials,
      [key]: e.target.value,
    });
  };

  const createUser = async () => {
    const { username, email, password, confirmPassword } = credentials;

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const resp = await fetch(`${apiURL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
          role: "traine",
          is_active: true,
        }),
      });

      const data = await resp.json();
      console.log("User created:", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong. Please try again.");
      return null;
    }
  };

  const Authorize = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${apiURL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (resp.ok) {
      const data = await resp.json();
      dispatch({
        type: "set_profile",
        payload: {
          email: credentials.email,
          token: data.access_token,
        },
      });
      localStorage.setItem("token", data.access_token);
      navigate(`/`);
      return data;
    }
  };

  const [logIn, setLogIn] = useState(true);

  const toggleForm = () => setLogIn((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (logIn) {
      console.log("Log In with", credentials);
    } else {
      console.log("Sign Up with", credentials);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gray-800">
      {/* Panel izquierdo */}
      <div className="flex justify-center items-center md:w-1/2 bg-[#b30000]/50">
        <img src={image}  alt="Logo" className="w-50 sm:w-100  " />
      </div>

      {/* Panel derecho */}
      <div className="flex flex-col justify-center items-center md:w-1/2 p-6">
        <h1 className="text-3xl text-[#b30000] font-bold mb-6">
          {logIn ? "Welcome Back!" : "Create Account"}
        </h1>

        <div className="relative w-72 md:w-80">
          {/* Log In Form */}
          <form
            onSubmit={handleSubmit}
            className={`absolute inset-0 flex flex-col gap-4 transition-all duration-500 ${
              logIn
                ? "opacity-100 translate-x-0 z-20"
                : "opacity-0 -translate-x-10 z-0 pointer-events-none"
            }`}
          >
            <input
              type="email"
              id="email"
              placeholder="email"
              className="p-2 rounded bg-gray-700 text-white"
              onChange={handleInputs}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="p-2 rounded bg-gray-700 text-white"
              onChange={handleInputs}
              required
            />
            <button
              type="submit"
              className="bg-[#b30000] hover:bg-[#ff4d4d] text-white font-bold py-2 px-4 rounded transition-colors"
              onClick={Authorize}
            >
              Log In
            </button>

            <button
              type="button"
              onClick={toggleForm}
              className="mt-2 text-sm text-[#b30000] hover:text-[#ff4d4d] transition-colors"
            >
              Don't have an account? Sign Up
            </button>
          </form>

          {/* Sign Up Form */}
          <form
            onSubmit={handleSubmit}
            className={`absolute inset-0 flex flex-col gap-4 transition-all duration-500 ${
              !logIn
                ? "opacity-100 translate-x-0 z-20"
                : "opacity-0 translate-x-10 z-0 pointer-events-none"
            }`}
          >
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="p-2 rounded bg-gray-700 text-white"
              onChange={handleInputs}
              required
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="p-2 rounded bg-gray-700 text-white"
              onChange={handleInputs}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="p-2 rounded bg-gray-700 text-white"
              onChange={handleInputs}
              required
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="p-2 rounded bg-gray-700 text-white"
              onChange={handleInputs}
              required
            />
            <button
              type="submit"
              className="bg-[#b30000] hover:bg-[#ff4d4d] text-white font-bold py-2 px-4 rounded transition-colors"
              onClick={createUser}
            >
              Sign Up
            </button>

            <button
              type="button"
              onClick={toggleForm}
              className="mt-2 text-sm text-[#b30000] hover:text-[#ff4d4d] transition-colors"
            >
              Already have an account? Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInSignUp;

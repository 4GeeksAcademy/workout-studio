import React, { useState } from "react";


const Test = () => {
  const imageURL = `https://picsum.photos/id/237/${window.innerHeight}/0`;
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [logIn, setLogIn] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const logOrSign = () => {
    setLogIn((prev) => !prev); // toggles between true/false
  };

  return (
    <>
      {logIn ? (
        <div className="flex bg-gray-800 content-between w-4xl m-auto mt-[100px] h-screen">
          <img src={imageURL} alt="random" />
          <div className="flex flex-col justify-evenly m-auto">
            <div className="m-auto mt-8 mb-6">
              <h1 className="text-3xl text-amber-400 font-bold mb-6">Hello Again!</h1>
            </div>
            <form>
              <div>
                <input
                  className="w-40 m-auto ms-8 text-white"
                  type="text"
                  id="username"
                  autoComplete="username"
                  placeholder="Type your email"
                  onChange={handleChange}
                />
                <label className="p-4 text-amber-400 font-bold" htmlFor="username">
                  User Name
                </label>
              </div>
              <div>
                <input
                  className="w-40 m-auto ms-8 text-white"
                  type="password"
                  id="password"
                  autoComplete="password"
                  placeholder="Type your Password"
                  onChange={handleChange}
                />
                <label className="p-4 text-amber-400 font-bold" htmlFor="password">
                  Password
                </label>
              </div>
            </form>
            <button
              onClick={logOrSign}
              className="bg-amber-400 text-black font-bold py-2 px-4 mt-6 rounded"
            >
              Switch to Sign Up
            </button>
          </div>
        </div>
      ) : (
        <div className="flex bg-gray-800 content-between w-4xl m-auto mt-[100px] h-screen">
          <div className="flex flex-col justify-evenly m-auto">
            <div className="m-auto mt-8 mb-6">
              <h1 className="text-3xl text-amber-400 font-bold mb-6">Hello Again!</h1>
            </div>
            <form>
              <div>
                <input
                  className="w-40 m-auto ms-8 text-white"
                  type="text"
                  id="username"
                  autoComplete="username"
                  placeholder="Type your email"
                  onChange={handleChange}
                />
                <label className="p-4 text-amber-400 font-bold" htmlFor="username">
                  User Name
                </label>
              </div>
              <div>
                <input
                  className="w-40 m-auto ms-8 text-white"
                  type="password"
                  id="password"
                  autoComplete="password"
                  placeholder="Type your Password"
                  onChange={handleChange}
                />
                <label className="p-4 text-amber-400 font-bold" htmlFor="password">
                  Password
                </label>
              </div>
            </form>
            <button
              onClick={logOrSign}
              className="bg-amber-400 text-black font-bold py-2 px-4 mt-6 rounded"
            >
              Switch to Log In
            </button>
          </div>
          <img src={imageURL} alt="random" />
        </div>
      )}
    </>
  );
};

export default Test;

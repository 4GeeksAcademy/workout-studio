import React, { useState } from "react";

const LogInSignUp= () => {
  const imageURL = `https://picsum.photos/id/237/${window.innerHeight}/0`;
  const [credentials, setCredentials] = useState({ username: "", password: "", email: "", confirmPassword: "" });
  const [logIn, setLogIn] = useState(true);
  const [trainer, setTrainer] = useState(false)

  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log(event.target.checked)
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const checkTrainer = (e) =>{
     const { id, checked} = e.target;
    setTrainer((prev) => ({ ...prev, [id]: checked }));
    console.log(trainer[checked])
  }

  const toggleForm = () => setLogIn((prev) => !prev);

  return (
    <div className="flex bg-gray-800 content-between w-4xl m-auto mt-[100px] h-screen">
    {/* Se utilizan varios condicionales, para que pueda hacerse el cambio de log in a sign up en una misma pagina, falta aplicar animaciones de tailwind */}
      {logIn && 
        <img src={imageURL} alt="random" />}
      )

     
      <div className="flex flex-col justify-evenly m-auto">
        <div className="m-auto mt-8 mb-6">
          <h1 className="text-3xl text-amber-400 font-bold mb-6">{logIn ? "Welcome Back!" : "Create Account"}</h1>
        </div>
        <form>
          <div>
            <input
              className="w-40 m-auto ms-8 text-white"
              type="text"
              id="username"
              placeholder="Type your username"
              onChange={handleChange}
            />
            <label className="p-4 text-amber-400 font-bold" htmlFor="username">Username</label>
          </div>

          {!logIn && (
            <div>
              <input
                className="w-40 m-auto ms-8 text-white"
                type="email"
                id="email"
                placeholder="Type your email"
                onChange={handleChange}
              />
              <label className="p-4 text-amber-400 font-bold" htmlFor="email">Email</label>
            </div>
          )}

          <div>
            <input
              className="w-40 m-auto ms-8 text-white"
              type="password"
              id="password"
              placeholder="Type your password"
              onChange={handleChange}
            />
            <label className="p-4 text-amber-400 font-bold" htmlFor="password">Password</label>
          </div>

          {!logIn && (
            <div>
              <input
                className="w-40 m-auto ms-8 text-white"
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
              />
              <label className="p-4 text-amber-400 font-bold" htmlFor="confirmPassword">Confirm Password</label>
            </div>
          )}

          {!logIn && (
           <div>
            <input id="trainer" type="checkbox" onClick={checkTrainer} />
            <label className="p-4 text-amber-400 font-bold" htmlFor="trainer"> Are you a trainer? </label>
           </div> 
          )}
        </form>

        <button
          onClick={toggleForm}
          className="bg-amber-400 text-black font-bold py-2 px-4 mt-6 rounded"
        >
          {logIn ? "Switch to Sign Up" : "Switch to Log In"}
        </button>
      </div>

      {!logIn && (
        <img className="animate-pulse" src={imageURL} alt="random" />
      )}
    </div>
  );
};

export default LogInSignUp;

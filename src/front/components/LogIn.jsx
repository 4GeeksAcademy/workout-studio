import React from "react";
import { useState } from "react";

const LogIn = () => {
const imageURL = `https://picsum.photos/id/237/${window.innerHeight}/0`;
const [credentials, setCredentials] = useState({username:"",password:""})

const handleChange = (event) =>{
    event.preventDefault()
    console.log(credentials)
    const {id,value} = event.target
    setCredentials( prev =>({ ...prev, [id]:value }) )
    console.log(credentials)

}

    return (
        <div className="flex bg-gray-800 content-between w-4xl m-auto mt-[100px] h-screen">

            <img
                src={imageURL} />


            <div className="flex flex-col justify-evenly m-auto " >
                <div className="m-auto mt-8 mb-6" >
                    <h1 className="text-3xl text-amber-400 font-bold mb-6" >Hello Again!</h1>
                </div>
                <form action="">

                    <div>
                        <input className="w-40 m-auto ms-8 text-white" type="text" id="username" autoComplete="username" placeholder="Type your email" onChange={handleChange} />
                        <label className="p-4 text-amber-400 font-bold" htmlFor="username"> User Name </label>
                    </div>
                    <div>
                        <input className="w-40 m-auto ms-8 text-white" type="password" id="password" autoComplete="password" placeholder="Type your Password" onChange={handleChange}/>
                        <label className="p-4 text-amber-400 font-bold" htmlFor="password"> Password </label>
                    </div>

                </form>

            </div>
        </div>



    )
}

export default LogIn;
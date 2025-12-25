import { useState } from "react";
import axios from "axios";
import {toast } from 'react-toastify';
import { Link } from "react-router-dom";
export default function Signup() {
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://zoomclone-v1fi.onrender.com/user/signup", data, {
        withCredentials: true,
      });
        toast.success(res.data.message); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="signup bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] w-screen h-[600px]">
        <div className="body md:pt-10 md:w-full md:h-full md:flex md:justify-center md:items-center">
          <div className="bg-card bg-gray-200 md:w-[30rem] md:h-[500px] md:pb-10 md:rounded-2xl md:flex md:justify-center md:items-center">
            <div className="card bg-gray-100 md:w-md md:h-full md:rounded-2xl mt-10">
              <form onSubmit={handlesubmit}>
                <h1 className="reg text-black font-bold md:pl-5 md:mt-2 md:text-2xl">
                  Registration
                </h1>
                <span className="border border-blue-500 md:flex md:w-7 md:ml-5 font-bold "></span>
                <div className="main-card md:flex md:flex-col md:gap-10 md:w-full md:h-full md:mt-10">
                  <div className="form-field mt-2 md:flex md:justify-center">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter your Username"
                      value={data.username}
                      onChange={handlechange}
                      className="border border-b-current md:pl-2 w-sm h-10 rounded-sm placeholder:pl-2"
                    />
                  </div>
                  <div className="form-field mt-2 md:flex md:justify-center">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      onChange={handlechange}
                      value={data.email}
                      className="border border-b-current md:pl-2 w-sm h-10 rounded-sm placeholder:pl-2"
                    />
                  </div>
                  <div className="form-field mt-2 md:flex md:justify-center">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      onChange={handlechange}
                      value={data.password}
                      className="border border-b-current md:pl-2 w-sm h-10 rounded-sm  placeholder:pl-2"
                    />
                  </div>
                  <div className="btn md:w-full h-full md:flex md:flex-col">
                    <button
                      className="w-30 bg-blue-600 ml-10 pt-2 pb-2 rounded-md text-white"
                      type="submit"
                    >
                      Signup
                    </button>
                     <Link to="/login" className="underline ml-10 mt-2">
                   Already registered? Log in here
                    </Link>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import axios from "axios"
import { useState } from "react"
import {toast } from 'react-toastify';
export default function Login(){
    const [data,setdata] = useState({
        email:"",
        password:""
    })
    const handlechange = (e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }

    const handlesubmit=async(e)=>{
        e.preventDefault()
         try {
      let res = await axios.post("http://localhost:8001/user/login", data, {
        withCredentials: true,
      });
        toast.success(res.data.message); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    }
    return(
        <>
         <div className="signup bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] w-screen h-[600px]">
        <div className="body md:pt-10 md:w-full md:h-full md:flex md:justify-center md:items-center">
          <div className="bg-card bg-gray-200 md:w-[30rem] md:h-[500px] md:pb-10 md:rounded-2xl md:flex md:justify-center md:items-center">
            <div className="card bg-gray-100 md:w-md md:h-full md:rounded-2xl mt-10">
              <form onSubmit={handlesubmit}>
                <h1 className="reg text-black font-bold md:pl-5 md:mt-2 md:text-2xl">
                  Login
                </h1>
                <span className="border border-blue-500 md:flex md:w-7 md:ml-5 font-bold "></span>
                <div className="main-card md:flex md:flex-col md:gap-10 md:w-full md:h-full md:mt-10">
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
                  <div className="btn md:w-full h-full">
                    <button
                      className="w-30 bg-blue-600 ml-10 pt-2 pb-2 rounded-md text-white"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
import { Link, Links, useNavigate } from "react-router-dom";
import '@fontsource/space-mono';
import '@fontsource-variable/montserrat';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";
export default function Navbar(){
    const [open,setopen] =  useState(false)
    const [isloggedIn,setisloggedIn] = useState(false) 
    const navigate  =  useNavigate()
    const handleclick = ()=>{
        navigate("/signup")
    }
    useEffect(()=>{
        const verify=async()=>{
            let res  =  await axios.get("https://zoomclone-v1fi.onrender.com/user/verify",{withCredentials:true})
            setisloggedIn(res.data.isloggedIn)
        }
        verify()
    },[])
    const handlelogout=async()=>{
        let res = await axios.post("https://zoomclone-v1fi.onrender.com/user/logout",{},{withCredentials:true})
        setisloggedIn(res.data.isloggedIn)
        toast.success(res.data.message)
    }
    return(
        <>
        <div className="navbar w-full h-20 bg-transparent shadow-none fixed inset-0 flex justify-between items-center z-56 ">
            <div className="nav-start text-white text-4xl  ml-6 font-bold" style={{fontFamily:"'Space Mono', monospace"}}>
                <Link to="/"><img src="/src/assets/zoom-logo-white.svg" alt="" /></Link>
            </div>
            <div className="nav-end text-white flex justify-center items-center gap-5 w-[30%]" style={{fontFamily:"'Montserrat Variable', sans-serif"}}>
                <Link  onClick={()=>setopen(!open)}>
                    Meet
                </Link>
                {open && (
                    <div className="w-40 h-30 bg-gray-200 absolute top-17 right-70 rounded-3xl flex  flex-col justify-center items-center gap-3">
                        <Link to="/join" className="text-black">
                            Join a meeting
                        </Link>
                        <Link to="/host" className="text-black">
                            Host a meeting
                        </Link>
                    </div>
                )}
                {
                    !isloggedIn && (
                <Link to="/login">
                    Sign In
                </Link>
                    )
                }
                {
                    isloggedIn && (
                         <button className="w-30 bg-blue-600 p-2 rounded-2xl text-white" onClick={handlelogout}>Logout</button>
                    )
                }
                <Link to="/support">
                    Support
                </Link>
                {
                    !isloggedIn && (
                            <button className="w-30 bg-blue-600 p-2 rounded-2xl text-white" onClick={handleclick}>Sign Up Free</button>
                    )
                } 
            </div>
        </div>
        </>
    )
}
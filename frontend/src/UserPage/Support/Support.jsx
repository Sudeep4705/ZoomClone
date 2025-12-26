import axios from "axios"
import { useState } from "react"
import {toast } from 'react-toastify';

export default function Support(){
    const [data,setdata] = useState({
        email:"",
        msg:""
    })
    const handlechange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const handlesubmit = async(e)=>{
        e.preventDefault()
            let res =  await axios.post("https://zoomclone-v1fi.onrender.com/meet/support",data,{withCredentials:true})
            toast.success(res.data.message)
    }
    return(
        <>
        <div className="support-main md:w-screen md:h-[600px] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] md:flex md:justify-center md:items-center">
               <div className="support-card md:w-xl h-[420px] bg-gray-100 md:rounded md:flex md:justify-center items-center">
                    <div className="support-form md:w-xl md:h-[400px] bg-white md:flex md:flex-col ">
                        <h1 className="text-black text-2xl pl-6 pt-2">Contact Us</h1>
                        <span className="border-2 border-blue-500 w-10 ml-6"></span>
                        <form onSubmit={handlesubmit}>
                            <div className="form-field">
                             <input type="email" placeholder="enter the email" name="email" onChange={handlechange} value={data.email} className="border border-black p-3 w-sm ml-6 mt-10 rounded"/>
                        </div>
                        <div className="form-field">
                            <textarea name="msg" id="msg" className="border border-black p-5 ml-6 mt-10 w-sm rounded" value={data.msg} onChange={handlechange} placeholder="enter the message...."></textarea>
                        </div>
                       <div className="btn">
                            <button className="w-30 ml-6 mt-10 rounded-md bg-blue-500 p-2 text-white" type="submit">Send Message</button>
                       </div>
                        </form>
                        
                    </div> 
                </div>   
        </div>
        </>
    )
}
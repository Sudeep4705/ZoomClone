import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function Host() {
  const navigate = useNavigate()
        const [data,setdata] =  useState({
            hostname:"",
        })
      const [meetingId, setMeetingId] = useState("");
     
    useEffect(()=>{
        const id  = Math.floor(100000000 + Math.random()*900000000) // it means the starting value is 1... to ending will be the ....
         setMeetingId(id.toString());          
    },[])
    const handlechange = (e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const handlesubmit = async(e)=>{
       await axios.post(
  "http://localhost:8001/meet/host",
  {
    hostname: data.hostname,
    meetingid: meetingId,
  },
  { withCredentials: true }
);
navigate(`/meeting/${meetingId}/${data.hostname}`);
}
  return(
    <>
      <div className=" h-[600px] bg-[linear-gradient(to_bottom,#06134b,#153d8a,#7f78d2)] relative inset-0 flex justify-center items-center flex-col">
        <div className="flex justify-center">
          <div className="mt-20 flex flex-col gap-3 w-[500px">
            <h1 className="text-white text-2xl text-center mb-5 mr-10">Host Meeting</h1>
            <label htmlFor="id" className="text-white">
             Host Name
            </label>
            <input
              name="hostname"
              type="text"
              placeholder="Enter Host Name"
              className="p-3 w-[400px] rounded-xl text-white border border-white"
              onChange={handlechange}
              value={data.hostname}
            />
            <label htmlFor="id" className="text-white">
             Meeting ID
            </label>
            <input
              name="meetingId"
              type="text"
              readOnly
              className="p-3 w-[400px] rounded-xl text-white border border-white"
              value={meetingId}
            />
            <span className="text-white w-[400px]">
              By clicking "Join", you agree to our 
              <span className="text-blue-300 hover:underline"> Terms of Services</span> and
              <span className="text-blue-300 hover:underline"> Privacy Statement</span>
            </span>
            <button className="w-[400px] rounded-2xl bg-white p-3 text-xl text-center text-gray-700" onClick={handlesubmit}>Host</button>
          </div>
        </div>
        {/* last sec */}
         <div className="mt-10 text-white">
            © 2025 Zoom Communications, Inc. All rights reserved. Privacy & Legal Policies 
        </div>   
      </div>
    </>
  );
}

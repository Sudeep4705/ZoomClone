import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Join() {
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState("");

  const handleclick = () => {
    if (!meetingId) {
      alert("Meeting ID is required");
      return;
    }
    navigate(`/meeting/${meetingId}/Guest`);
  };
  return (
    <>
      <div className=" h-[500px] bg-[linear-gradient(to_bottom,#06134b,#153d8a,#7f78d2)] relative inset-0 flex justify-center items-center flex-col">
        <div className="flex justify-center">
          <div className="mt-20 flex flex-col gap-3 w-[500px">
            <h1 className="text-white text-2xl text-center mb-5 mr-10">Join Meeting</h1>
            <label htmlFor="id" className="text-white">
              Meeting ID or Personal Link Name
            </label>
            <input
              type="text"
              placeholder="Enter Meeting ID or Personal Link Name"
              className="p-3 w-[400px] rounded-xl text-white border border-white"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
            />
            <span className="text-white w-[400px]">
              By clicking "Join", you agree to our 
              <span className="text-blue-300 hover:underline"> Terms of Services</span> and
              <span className="text-blue-300 hover:underline"> Privacy Statement</span>
            </span>
            <button
              className="w-[400px] rounded-2xl bg-white p-3 text-xl text-center text-gray-700"
              onClick={handleclick}
            >
              Join
            </button>
          </div>
        </div>
        <div className="mt-10 text-white">
          © 2025 Zoom Communications, Inc. All rights reserved. Privacy & Legal Policies 
        </div>
      </div>
    </>
  );
}

import { motion } from "framer-motion";
import { useState } from "react";

export default function Partners() {
  const images = [
    "Images/pic1.jpg",
    "Images/pic2.jpg",
    "Images/pic3.jpg",
    "Images/pic4.jpg",
  ];
    const [active, setActive] = useState(0);
  return (
    <>
      <div className="w-full mt-10 mb-10">
        <h6 className="text-black text-center text-2xl font-bold">
          Trusted by millions. Built for you.
        </h6>
        {/* logo */}
        <div className="logo flex justify-evenly mt-10">
          <img src="Images/nt.png" alt="" className="w-40" />
          <img src="Images/wm.png" alt="" className="w-40" />
          <img src="Images/wn.png" alt="" className="w-40" />
          <img src="Images/mf.png" alt="" className="w-40" />
          <img src="Images/exm.png" alt="" className="w-40" />
          <img src="Images/co.png" alt="" className="w-40" />
        </div>
        {/* other content */}
        <div className="px-70 mt-20">
          <h1 className="text-[#02073E] text-4xl text-center">
            “Zoom Workplace turns my brainwaves into polished gems. From
            meetings, I can create Clips, Notes, Docs, or even whiteboards
            faster than you can say, ‘transcript.”
          </h1>
          <div className="mt-20">
            <p className="text-center">Marquesa Pettway</p>
            <h1 className="text-center">Founder</h1>
          </div>
        </div>
        {/* cards image */}
        <div className="w-full px-60 mt-10">
            <h1 className="text-center  text-6xl text-[#02073E]">Companies are achieving more with Zoom</h1>
        </div>
         
      <div className="flex gap-4 px-20 h-[500px] mt-20">
      {images.map((img, index) => (
        <motion.div
          key={index}
          onMouseEnter={() => setActive(index)}
          className="h-full rounded-2xl overflow-hidden cursor-pointer"
          animate={{
            width: active === index ? 900 : 120, 
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 22,
          }}
        >
          <img
            src={img}
            className="w-full h-full object-cover rounded-2xl"
            alt=""
          />
        </motion.div>
      ))}
    </div>
      </div>
    </>
  );
}

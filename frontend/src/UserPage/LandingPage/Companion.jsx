import aic from "../assets/aic-logo.svg";
export default function Companion() {
  return (
    <div className="w-full pt-20 pb-40 bg-linear-to-b from-[#070F3A] via-[#050A29] to-black mt-20">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <img src={aic} alt="logo" className="h-10" />
      </div>
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-white text-5xl">Introducing</h1>
        <h1
          className="
          text-6xl font-bold bg-linear-to-r 
          from-[#A77AFF] via-[#6AB4FF] to-[#1E4CFF]
          bg-clip-text text-transparent
        ">
          Zoom AI Companion 3.0*
        </h1>
        <div className="flex justify-center mt-6">
          <p className="text-white w-[900px] text-center">
            AI Companion does more than save you time. It captures context,
            uncovers insights, and helps you deliver better work — from stronger
            customer conversations to faster, more-informed decisions.
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <button className="py-3 px-6 bg-blue-500 rounded-xl text-white">
            Learn more
          </button>
        </div>
      </div>
      {/* AI Window Image*/}
      <div className="flex w-full">
        <div className="w-full flex justify-start mt-20 pl-30">
          <img
            src="/Images/aic-window.png"
            className="h-[600px] w-[900px] border border-[#2A3FA3]
    bg-[#071235]
    drop-shadow-[0px_0px_100px_rgba(0,102,255,0.6)] rounded-xl"
            alt="AI Companion Window"
          />
        </div>
        {/* rigth side */}
        <div className="pr-30 py-5">
          <h2 className="font-bold text-center text-xl text-white mt-20 mb-5">
            Zoom AI Companion helps by:
          </h2>
          <div>
            <ul className="flex flex-col gap-2">
              <li class="relative pl-4 text-white">
                <span class="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-white"></span>
                Summarizing meetings fast
              </li>
              <li class="relative pl-4 text-white">
                <span class="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-white"></span>
                Quickly generating first draft document
              </li>
              <li class="relative pl-4 text-white">
                <span class="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-white"></span>
                Saving users an estimated 6 hours per week in meetings**
              </li>
            </ul>
          </div>
          <div className="w-10 h-[2px] bg-gray-400 mt-20"></div>
          <div>
            <img
              src="Images/aic-testimonial-logo.png"
              className="w-25 h-20 mt-10"
              alt=""
            />
            <div className="w-80">
              <p class="bg-gradient-to-r from-[#0095FF] via-[#5F6DFF] to-[#B65CFF] bg-clip-text text-transparent text-2xl">
                "It always comes down to 'I want to work on my business, not in
                my business.' Zoom AI Companion allows me to have that time back
                to do the work that only I can do."
              </p>
              <p className="text-white text-xs mt-10">Nancy Koziol</p>
              <p className="text-white text-xs">Founder, couch + cork</p>
            </div>
          </div>
        </div>
      </div>
      {/* last sec */}
      <div>
        <p className="text-white text-center mt-20 text-sm">*AI Companion 3.0 features and functionality coming November 2025</p>
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { useState } from "react";
export default function Segment1() {
  const [addtext, setaddtext] = useState("Collaboration");
  console.log(addtext);

  const index = [
    "Collaboration",
    "Customer support",
    "Marketing",
    "Sales",
    "Employee engagement",
  ];
  return (
    <>
      <div className="segment w-full h-full flex justify-center items-center flex-col mt-10">
        <div className="w-2xl  h-[300px]">
          <p className="text-5xl text-center font-bold text-[#02073E]">
            One platform.
          </p>
          <p className="text-5xl text-center font-bold text-[#02073E]">
            Endless ways to work together.
          </p>
          <p className="mt-5 text-center font-bold text-[#02073E]">From client pitches to global all-hands, patient consults to classrooms, Zoom delivers the flexibility and reliability you need. And with AI built in, every interaction is faster, easier, and more productive.</p>
        </div>
        {/* submodule section */}
        <div className="module w-full flex justify-center gap-3 mt-10">
          {index.map((seg, i) => (
            <motion.button
              key={i}
              onClick={() => setaddtext(seg)}
              className={`p-3 rounded-xl transition-all 
      ${
        addtext === seg
          ? "border border-blue-600 shadow shadow-blue-400"
          : "bg-white text-black"
      }`}
              whileTap={{ scale: 0.95 }}
            >
              {seg}
            </motion.button>
          ))}
        </div>
        {addtext == "Collaboration" && (
          <div className="mt-20 w-full h-[500px] flex">
            <div className="info w-[60%] pl-15 pr-15">
              <p className="text-black">
                AI-first UCaaS for team collaboration lets you work together
                without friction using Meetings, Chat, Docs, and more, all built
                into Zoom Workplace.
              </p>
              <ul class="ml-6 space-y-3">
                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Unify how teams connect:</b> Meetings, Phone, Chat, and
                  more are all in one UCaaS platform, so communication feels
                  seamless.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Consolidate your tools:</b> Replace scattered apps with an
                  all-in-one solution that saves time, reduces costs, and keeps
                  work in sync.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Support hybrid and remote work:</b> Keep even global teams
                  engaged with reliable video conferencing, persistent chat,
                  shared docs, and more.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Keep workflows moving:</b> From brainstorms to docs to
                  quick check-ins, Zoom helps teams cut friction and avoid
                  projects stalling.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Do more with AI:</b> Built-in AI summarizes meetings,
                  drafts follow-ups, and shares next steps, so your team spends
                  more time creating.
                </li>
              </ul>
            </div>
            <div className="image w-[40%] p-2">
              <img
                src="Images/collaboration.png"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        )}
        {addtext == "Customer support" && (
          <div className="mt-20 w-full h-[500px] flex">
            <div className="info w-[60%] pl-15 pr-15">
              <p className="text-black">
                Solve customer issues faster and deliver a seamless experience across every channel with AI-first contact center and CX solutions.
              </p>
              <ul class="ml-6 space-y-3">
                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Resolve inquiries efficiently:</b> Phone, chat, email, SMS, social, and video flow into one platform for full context.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Automate complex interactions:</b> Virtual Agent handles multi-intent questions, so human agents can focus on high-value cases.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Boost self-service and loyalty:</b> Instant answers and proactive resolutions reduce friction and improve satisfaction.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Help agents focus on what matters:</b> AI highlights key actions, suggests responses, and streamlines repetitive tasks.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Turn data into action:</b> Integrated CRM, real-time analytics, and conversation insights help teams spot trends and improve CX.
                </li>
              </ul>
            </div>
            <div className="image w-[40%] p-2">
              <img
                src="Images/customer-support.png"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        )}
        {addtext == "Marketing" && (
          <div className="mt-20 w-full h-[500px] flex">
            <div className="info w-[60%] pl-15 pr-15">
              <p className="text-black">
               Drive growth for your business with Zoom webinars and virtual events for demand generation — built to engage audiences and deliver results.
              </p>
              <ul class="ml-6 space-y-3">
                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Keep audiences engaged:</b> Capture leads and build pipeline with branded webinars and events that generate long-lasting demand.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Deliver stand-out experiences:</b> Host polished, interactive events that reflect your brand and leave a lasting impression on customers.

                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Fuel smarter campaigns:</b> Extend every event with virtual and hybrid options, giving you a broader reach and richer insights.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Put busywork on auto-pilot with AI:</b> Automate content, personalize outreach, and analyze performance faster.
                </li>
              </ul>
            </div>
            <div className="image w-[40%] p-2">
              <img
                src="Images/marketing.png"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        )}
        {addtext == "Sales" && (
          <div className="mt-20 w-full h-[500px] flex">
            <div className="info w-[60%] pl-15 pr-15">
              <p className="text-black">
              Equip your team with Zoom sales enablement tools with AI insights so they can focus on customers, accelerate deals, and grow revenue.
              </p>
              <ul class="ml-6 space-y-3">
                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Make selling easier:</b> Eliminate admin work like note-taking and CRM updates so reps can spend more time building relationships.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Boost productivity and win rates:</b> HAuto-summarized meetings, suggested follow-ups, and deal insights keep cycles short.

                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Give RevOps deeper visibility:</b> See pipeline insights and competitor trends to forecast and prospect with confidence.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Close with confidence:</b> Agentic AI flags risks, coaches reps, and automates next steps, keeping work moving forward.
                </li>
              </ul>
            </div>
            <div className="image w-[40%] p-2">
              <img
                src="Images/sales.png"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        )}
        {addtext == "Employee engagement" && (
          <div className="mt-20 w-full h-[500px] flex">
            <div className="info w-[60%] pl-15 pr-15">
              <p className="text-black">
            Strengthen culture and hybrid workforce engagement across teams with Zoom Workplace.
              </p>
              <ul class="ml-6 space-y-3">
                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Foster community in hybrid teams:</b>Get company-wide updates, recognition, and social feeds that connect remote employee.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Create immersive experiences:</b> Run interactive all-hands, learning sessions, and celebrations that teams look forward to.

                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Communicate on your schedule:</b> Share video announcements asynchronously, aligning teams without more meetings.
                </li>

                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Reinforce culture and recognition:</b> Highlight employee wins, anniversaries, and initiatives with rich media and live events.
                </li>
                <li class="relative pl-4">
                  <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0B5FFF]"></span>
                  <b>Measure engagement to improve:</b> Use analytics from Events, Clips, and Workvivo to understand participation and surface gaps.
                </li>
              </ul>
            </div>
            <div className="image w-[40%] p-2">
              <img
                src="Images/employee-engagement.png"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

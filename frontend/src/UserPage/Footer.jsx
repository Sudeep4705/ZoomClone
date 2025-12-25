import SaveAltIcon from "@mui/icons-material/SaveAlt";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logo from "../assets/zoom-logo-white.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer bg-linear-to-b from-[#070F3A] via-[#050A29] to-black py-16 px-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* COLUMN 1 */}
        <div>
          <img
            src={logo}
            alt="logo"
            className="w-32 mb-6"
          />
          <div className="flex gap-3 items-center mb-10">
            <div className="w-12 h-12 bg-white rounded-md text-blue-500 flex items-center justify-center">
              <SaveAltIcon />
            </div>
            <div className="text-white">
              <a href="#" className="hover:underline text-sm">
                Download Center
              </a>
              <p className="text-[10px] text-gray-300">Get the most out of Zoom</p>
            </div>
          </div>

          <h2 className="text-gray-300">Talk to a sales rep</h2>
          <p className="text-white text-xl font-bold mb-6">
            1.888.799.9666
          </p>   

          <div className="text-white flex gap-4 mb-4">
            <FacebookIcon fontSize="large" />
            <YouTubeIcon fontSize="large" />
            <LinkedInIcon fontSize="large" />
            <InstagramIcon fontSize="large" />
          </div>

          <p className="text-white text-[10px]">
            Copyright ©2025 Zoom Communications, Inc. All rights reserved.
          </p>
        </div>

        {/* COLUMN 2 */}
        <div>
          <h3 className="text-white text-lg mb-4">About</h3>
          <div className="flex flex-col gap-2 text-gray-300 text-sm">
            <Link to="/blog" className="hover:underline">Zoom Blog</Link>
            <Link to="/customers" className="hover:underline">Customers</Link>
            <Link to="/team" className="hover:underline">Our Team</Link>
            <Link to="/careers" className="hover:underline">Careers</Link>
            <Link to="/integrations" className="hover:underline">Integrations</Link>
            <Link to="/investors" className="hover:underline">Investors</Link>
            <Link to="/press" className="hover:underline">Press</Link>
            <Link to="/sustainability" className="hover:underline">Sustainability & ESG</Link>
            <Link to="/media-kit" className="hover:underline">Media Kit</Link>
            <Link to="/videos" className="hover:underline">How To Videos</Link>
            <Link to="/platform" className="hover:underline">Developer Platform</Link>
            <Link to="/ventures" className="hover:underline">Zoom Ventures</Link>
            <Link to="/store" className="hover:underline">Zoom Merchandise Store</Link>
          </div>
        </div>

        {/* COLUMN 3 */}
        <div>
          <h3 className="text-white text-lg mb-4">Download</h3>
          <div className="flex flex-col gap-2 text-gray-300 text-sm">
            <Link className="hover:underline">Zoom Workplace App</Link>
            <Link className="hover:underline">Zoom Rooms App</Link>
            <Link className="hover:underline">Zoom Rooms Controller</Link>
            <Link className="hover:underline">Browser Extension</Link>
            <Link className="hover:underline">Outlook Plug-in</Link>
            <Link className="hover:underline">iPhone/iPad App</Link>
            <Link className="hover:underline">Android App</Link>
            <Link className="hover:underline">Virtual Backgrounds</Link>
          </div>
        </div>

        {/* COLUMN 4 */}
        <div>
          <h3 className="text-white text-lg mb-4">Sales</h3>
          <div className="flex flex-col gap-2 text-gray-300 text-sm">
            <Link className="hover:underline">Contact Sales</Link>
            <Link className="hover:underline">Plans & Pricing</Link>
            <Link className="hover:underline">Request a Demo</Link>
            <Link className="hover:underline">Webinars & Events</Link>
            <Link className="hover:underline">Experience Center</Link>
          </div>
        </div>

        {/* COLUMN 5 */}
        <div>
          <h3 className="text-white text-lg mb-4">Support</h3>
          <div className="flex flex-col gap-2 text-gray-300 text-sm">
            <Link className="hover:underline">Test Zoom</Link>
            <Link className="hover:underline">Account</Link>
            <Link className="hover:underline">Support Center</Link>
            <Link className="hover:underline">Learning Center</Link>
            <Link className="hover:underline">Zoom Community</Link>
            <Link className="hover:underline">Technical Library</Link>
            <Link className="hover:underline">Feedback</Link>
            <Link className="hover:underline">Contact Us</Link>
            <Link className="hover:underline">Accessibility</Link>
            <Link className="hover:underline">Developer Support</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

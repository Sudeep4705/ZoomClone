import { BrowserRouter,Routes,Route } from "react-router-dom"
import UserLayout from "../Layouts/UserLayout"
import HomePage from "./UserPage/LandingPage/HomePage"
import Join from "./UserPage/MeetingRoom/Join"
import Host from "./UserPage/MeetingRoom/Host"
import Meeting from "./UserPage/MeetingRoom/Meeting"
import Signup from "./UserPage/Auth/Signup"
import { ToastContainer } from 'react-toastify';
import Login from "./UserPage/Auth/Login"
function App() {
  return (
    <>
     <BrowserRouter>
 <ToastContainer position="top-center" />
     <Routes>
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="join" element={<Join/>}/>
      <Route path="host" element={<Host/>}/>
      <Route path="meeting/:meetingId/:hostname" element={<Meeting/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="login"  element={<Login/>}/>
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}
export default App

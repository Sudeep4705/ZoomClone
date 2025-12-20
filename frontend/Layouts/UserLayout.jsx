import {Outlet} from "react-router-dom"
import Navbar from "../src/UserPage/Navbar"
import Footer from "../src/UserPage/Footer"

export default function UserLayout(){
    return(
        <>
        <div className="layout">
            <Navbar/>
            <main className="main-content">
             <Outlet/> 
            </main>
            <Footer/>
        </div>
        </>
    )
}
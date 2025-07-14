import React from "react";
import "./Navbar.css"; 
import { IoStatsChartOutline } from "react-icons/io5";
import { TiInputChecked } from "react-icons/ti";
import { FaFileSignature } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { GiNinjaHead } from "react-icons/gi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Navbar({setCurrentView}) {
  const nav=useNavigate();
  async function handleClick(){
    try{
      const response= await axios.post(" http://localhost:7000/Manage/logout");
      
      console.log(response.data);
      toast.success("logout successful");
      setTimeout(() => {
        localStorage.removeItem("userr");
        nav("/")
      }, 1000);
    }
    catch(error){

    }
  }
  return (
    <nav className="navbar">
        <div className="nav-title-container">
        <h1 className="nav-title">
           <GiNinjaHead/> TaskFlow
        </h1>
        <p className="nav-subtitle">
            Project Management  
        </p>
        </div>
      <ul className="nav-list">
        <li><button className="btn1" onClick={() => setCurrentView("dashboard")}><IoStatsChartOutline />Dashboard</button></li>
        <li><button className="btn1" onClick={() => setCurrentView("tasks")}><TiInputChecked />Tasks</button></li>
        <li><button className="btn1" onClick={() => setCurrentView("projects")}><FaFileSignature />Projects</button></li>
        <li><button className="btn1" onClick={() => setCurrentView("profile")}><CgProfile />Profile</button></li>
      </ul>
      <div className="logoutNav">
        <button className="logout-button" onClick={handleClick}><CiLogout/>Logout</button>
      </div>
    </nav>
  );
}

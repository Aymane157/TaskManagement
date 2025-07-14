import React from "react";
import Navbar from "../components/NavBar.jsx";
import '../index.css';
import { useState } from "react";
import Dashboard from "./Dashboard.jsx";
import Tasks from "./Tasks.jsx";
import Projects from "./Projects.jsx";
import Profile from "./Profile.jsx";
export default function Index() {
 const [currentView, setCurrentView] = useState("dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "tasks":
        return <Tasks />;
      case "projects":
        return <Projects />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (<>
  <div className="main">
    <Navbar setCurrentView={setCurrentView} />
   
      {renderView()}
      
   </div>
  </>
  );
}

import "./TaskCard2.css"
import React from 'react'
import { GiNinjaHead } from "react-icons/gi";
import { FaCalendar } from "react-icons/fa";
const TaskCard2 = (prop) => {
  return (
    <div className="CardT">
       <h1>{prop.name}</h1>
       <p>{prop.description}</p>
       <p className="status">{prop.status}</p>
       <p style={{display:"flex",gap:"20px"}}><GiNinjaHead style={{marginTop:"2px"}}/>{prop.createdBy}</p>
       <p style={{display:"flex", gap:"20px"}}> <FaCalendar/><span className="calendar"> {prop.duedate}</span></p>
       <div className="status-buttons">
        <button disabled={prop.status === "todo"} onClick={() => prop.onStatusChange("todo")}>To Do</button>
        <button disabled={prop.status === "in-progress"} onClick={() => prop.onStatusChange("in-progress")}>In Progress</button>
        <button disabled={prop.status === "done"} onClick={() => prop.onStatusChange("done")}>Done</button>
      </div>
       <button className="delete-btn" onClick={prop.onDelete}>🗑 Delete</button>

    </div>
  )
}

export default TaskCard2
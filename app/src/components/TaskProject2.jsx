import "./TaskCard2.css"
import React from 'react'
import { GiNinjaHead } from "react-icons/gi";
import { FaCalendar } from "react-icons/fa";
const TaskProject2 = (prop) => {
  return (
    <div className="CardT">
       <h1>{prop.name}</h1>
       <p>{prop.description}</p>
       <p className="status"><select value={prop.status} onChange={(e) => prop.onStatusChange(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select></p>

       <p style={{display:"flex", gap:"20px"}}> <FaCalendar/><span className="calendar"> {prop.duetime}</span></p>
       <label for="file">Progress</label>
       <progress id="file" max="100" value="70">70%</progress>
       <p><span>{prop.tasknumber}</span>Tasks Completed</p>
 
    </div>
  )
}

export default TaskProject2
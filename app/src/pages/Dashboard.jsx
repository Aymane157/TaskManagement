import "./login.css";
import { MdTaskAlt } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { FaArrowTrendUp } from "react-icons/fa6";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:7000/Manage/tasks", {
          withCredentials: true,
        });
        setTasks(response.data.tasks);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTasks();
  }, []);

  // Calculate counts dynamically
  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === "in-progress").length;
  const completedCount = tasks.filter((t) => t.status === "done" || t.status === "completed").length;
  const todoCount = tasks.filter((t) => t.status === "todo").length;

  // Completion rate = completed / total * 100
  const completionRate = totalTasks === 0 ? 0 : ((completedCount / totalTasks) * 100).toFixed(1);

  const pieData = {
    labels: ["To Do", "In Progress", "Completed"],
    datasets: [
      {
        data: [todoCount, inProgressCount, completedCount],
        backgroundColor: ["#A259FF", "#00BBCC", "#00C896"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className="dashcontainer">
        <div className="renderView-container">
          <div className="content" style={{ background: "#059BBF" }}>
            <h1 style={{ color: "white" }}>Total Tasks</h1>
            <br />
            <p className="p">
              <MdTaskAlt /> {totalTasks}
            </p>
          </div>
          <div className="content" style={{ background: "#F155FF" }}>
            <h1 style={{ color: "white" }}>In Progress</h1>
            <p className="p">
              <FaClock /> {inProgressCount}
            </p>
          </div>
          <div className="content" style={{ background: "#0ADE74" }}>
            <h1 style={{ color: "white" }}>Completed</h1>
            <p className="p">
              <MdTaskAlt /> {completedCount}
            </p>
          </div>
          <div className="content" style={{ background: "coral" }}>
            <h1 style={{ color: "white" }}>Completion Rate</h1>
            <p className="p">
              <FaArrowTrendUp /> {completionRate}%
            </p>
          </div>
        </div>

        {/* Pie Chart */}
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            width: "90%",
            maxWidth: "600px",
            height: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Task Status Distribution
          </h2>
          <div style={{ height: "300px", marginBottom: "500px" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </>
  );
}

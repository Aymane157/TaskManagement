import "./Task.css";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { VscVmActive } from "react-icons/vsc";
import { RiTeamFill } from "react-icons/ri";
import TaskProject from "../components/TaskProject.jsx";
import TaskProject2 from "../components/TaskProject2.jsx";
import axios from "axios";
import toast from "react-hot-toast";

export default function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duetime, setDuetime] = useState("");
  const [projects, setProjects] = useState([]);
  const [number, setNumber] = useState({});

  // Fetch projects counts for each project
  useEffect(() => {
    async function fetchCounts() {
      const counts = {};
      await Promise.all(
        projects.map(async (project) => {
          try {
            const res = await axios.post(
              "http://localhost:7000/Manage/numberTask",
              { projectId: project._id },
              {
                withCredentials: true,
              }
            );
            counts[project._id] = res.data.count;
          } catch (err) {
            counts[project._id] = 0;
            console.error(err);
          }
        })
      );
      setNumber(counts);
    }

    if (projects.length > 0) {
      fetchCounts();
    }
  }, [projects]);

  // Fetch projects
  useEffect(() => {
    async function fetchProj() {
      try {
        const response = await axios.get("http://localhost:7000/Manage/getProjet", {
          withCredentials: true,
        });
        setProjects(response.data.projects);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchProj();
  }, []);

  // Status update handler
  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await axios.put(
        "http://localhost:7000/Manage/updateProjectStatus",
        { projectId, status: newStatus },
        { withCredentials: true }
      );
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj._id === projectId ? { ...proj, status: newStatus } : proj
        )
      );
      toast.success("Project status updated!");
    } catch (error) {
     
      toast.error("Failed to update status");
    }
  };

  // Create new project handler
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/Manage/createproject",
        { name, description, duetime },
        { withCredentials: true }
      );
      toast.success("Project created!");
      setShowModal(false);
      setName("");
      setDescription("");
      setDuetime("");
      // Refresh projects after creation
      const res = await axios.get("http://localhost:7000/Manage/getProjet", {
        withCredentials: true,
      });
      setProjects(res.data.projects);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create project");
    }
  };

  // Summary counts
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;
  const pendingProjects = projects.filter((p) => p.status === "pending").length;
  const teamMembersCount = 1; // Placeholder

  return (
    <>
      <div className="TaskContainer">
        <div className="TitleTask">
          <h1 className="titTask">Projects</h1>
          <button className="btnTask" onClick={() => setShowModal(true)}>
            <IoMdAdd style={{ marginRight: "20px" }} /> Add Project
          </button>
        </div>

        <div className="taskProjects">
          <TaskProject name="Total Projects" number={totalProjects} color="white" icon={<VscVmActive color="coral" size="25px" />} />
          <TaskProject name="Pending" number={pendingProjects} color="white" icon={<RiTeamFill color="orange" size="25px" />} />
          <TaskProject name="Active" number={activeProjects} color="white" icon={<RiTeamFill color="violet" size="25px" />} />
          <TaskProject name="Completed" number={completedProjects} color="white" icon={<VscVmActive color="green" size="25px" />} />
          <TaskProject name="Team Members" number={teamMembersCount} color="white" icon={<RiTeamFill color="coral" size="25px" />} />
        </div>

        <div className="taskCardss2">
          {projects.map((project, index) => (
            <TaskProject2
              key={index}
              name={project.name}
              description={project.description}
              status={project.status || "pending"}
              duetime={project.duetime ? new Date(project.duetime).toLocaleDateString() : "N/A"}
              tasknumber={number[project._id] ?? "..."}
              onStatusChange={(newStatus) => handleStatusChange(project._id, newStatus)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form className="modal-form" onSubmit={handleCreateProject}>
              <label>Project Name</label>
              <input type="text" placeholder="Enter project name" value={name} onChange={(e) => setName(e.target.value)} required />

              <label>Description</label>
              <textarea placeholder="Enter project description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

              <label>Due Date</label>
              <input type="date" value={duetime} onChange={(e) => setDuetime(e.target.value)} required />

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="create-btn">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

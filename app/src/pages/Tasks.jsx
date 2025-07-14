import "./Task.css";
import { IoMdAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard.jsx";
import TaskCard2 from "../components/TaskCard2.jsx";
import axios from "axios";
import toast from "react-hot-toast"; // Optional for notifications

export default function Tasks() {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");

  // Task form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo"); // Fixed value
  const [priority, setPriority] = useState("medium"); // Fixed value
  const [assignee, setAssignee] = useState("");
  const [duedate, setDueDate] = useState("");
  const [task, setTask] = useState([]);

  const todoCount = task.filter((t) => t.status === "todo").length;
  const inProgressCount = task.filter((t) => t.status === "in-progress").length;
  const doneCount = task.filter((t) => t.status === "done").length;

  useEffect(() => {
    async function fetchProj() {
      try {
        const response = await axios.get("http://localhost:7000/Manage/getProjet", {
          withCredentials: true,
        });
        setProjects(response.data.projects);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchProj();
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:7000/Manage/tasks", {
          withCredentials: true,
        });

        setTask(response.data.tasks);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchTasks();
  }, []);

  async function handleDelete(taskId) {
    try {
      await axios.post(
        "http://localhost:7000/Manage/delTask",
        { taskid: taskId },
        { withCredentials: true }
      );
      toast.success("Task deleted!");
      setTask((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      toast.error("Failed to delete task.");
      console.error(err);
    }
  }

  async function updateTaskStatus(taskId, newStatus) {
    try {
      await axios.post(
        "http://localhost:7000/Manage/updateTaskStatus",
        { taskId: taskId, status: newStatus },
        { withCredentials: true }
      );
      toast.success("Task status updated!");
      setTask((prevTasks) =>
        prevTasks.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      toast.error("Failed to update task status.");
      console.error(err);
    }
  }

  async function handleSub(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/Manage/createTask",
        {
          title,
          description,
          status,
          priority,
          assignee,
          duedate,
          project: selectedProjectId,
        },
        { withCredentials: true }
      );
      toast.success("Task created!");
      setShowModal(false);
      // Clear form
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setAssignee("");
      setDueDate("");
      setSelectedProjectId("");
      // Optionally reload tasks after creation
      setTask((prev) => [...prev, response.data.task]);
    } catch (err) {
      toast.error("Failed to create task.");
      console.error(err);
    }
  }

  return (
    <>
      <div className="TaskContainer">
        <div className="TitleTask">
          <h1 className="titTask">Task Board</h1>
          <button className="btnTask" onClick={() => setShowModal(true)}>
            <IoMdAdd style={{ marginRight: "20px" }} /> Add Task
          </button>
        </div>

        <div className="taskCardss">
          <TaskCard name="To Do" number={todoCount} color="coral" />
          <TaskCard name="In Progress" number={inProgressCount} color="#94C5FF" />
          <TaskCard name="Completed" number={doneCount} color="#79EF9A" />
        </div>

        <div className="taskCardss2">
          {task.map((task) => (
            <TaskCard2
              key={task._id}
              name={task.title}
              description={task.description}
              status={task.status}
              createdBy={task.createdBy?.username || "Unknown"}
              duedate={task.duedate}
              onDelete={() => handleDelete(task._id)}
              onStatusChange={(newStatus) => updateTaskStatus(task._id, newStatus)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create New Task</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSub}>
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Description</label>
              <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <div className="form-row">
                <div>
                  <label>Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Completed</option>
                  </select>
                </div>
                <div>
                  <label>Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label>Project</label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    required
                  >
                    <option value="">Select a project</option>
                    {projects.map((proj) => (
                      <option key={proj._id} value={proj._id}>
                        {proj.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Assignee</label>
                  <input
                    type="text"
                    placeholder="Assign to..."
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    required
                  />
                </div>
              </div>

              <label>Due Date</label>
              <input
                type="date"
                value={duedate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="create-btn">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

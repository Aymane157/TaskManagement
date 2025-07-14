import Tasks from "../model/Tasks.js";
import mongoose from "mongoose";
export const createTask = async (req, res) => {
    const { title, status, priority, description, duedate, project } = req.body;
    
    try {
        if (!title || !status || !priority || !description || !project) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingTask = await Tasks.findOne({ title, project });
        if (existingTask) {
            return res.status(400).json({ message: "Task with this title already exists in the project" });
        }   
        const createdBy = req.session.user ? req.session.user.id : null;
        const newTask = new Tasks({
            title,
            status,
            priority,
            description,
            duedate,
            project,
            createdBy: createdBy ,
        });

        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const updateTask = async (req, res) => {
   
    const {  status,taskId } = req.body;

    try {
        const task = await Tasks.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

       
        if (status) task.status = status;
      

        await task.save();
        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteTask = async (req, res) => {
  const { taskid } = req.body;

  try {
    const result = await Tasks.deleteOne({ _id:  taskid  });
    const task = await Tasks.findById(taskid);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getProject=async (req, res) => {

}
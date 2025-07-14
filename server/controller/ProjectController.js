import Project from "../model/Project.js";
import Tasks from "../model/Tasks.js";
import mongoose from "mongoose";
export const createProject = async (req, res) => {
    const { name, description, duetime } = req.body;

    try {
        if (!name || !description || !duetime ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const existingProject = await Project.findOne({ name });
        if (existingProject) {  
            return res.status(400).json({ message: "Project with this name already exists" });
        }
        const createdBy = req.session.user ? req.session.user.id : null;
        const newProject = new Project({
            name,
            description,
            duetime,
            createdBy: createdBy,
            
        });
        await newProject.save();
        res.status(201).json({ message: "Project created successfully", project: newProject
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getNumberTask = async (req, res) => {
  try {
    const userId = req.session.user.id;
     // or req.session.userId / req.user / however you store it
    const { projectId } = req.body; // or req.params / req.body based on frontend
    
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required." });
    }

    const taskCount = await Tasks.countDocuments({
      createdBy: userId,
      project: projectId,
    });

    return res.status(200).json({ count: taskCount });
  } catch (error) {
    console.error("Error getting task count:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
export const updateProj = async (req, res) => {
  const { projectId, status } = req.body;
  const allowedStatuses = ["pending", "active", "completed"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.status = status;
    await project.save();

    res.json({ message: "Status updated", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

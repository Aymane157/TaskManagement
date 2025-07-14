import User from "../model/User.js";
import bcrypt from "bcrypt";
import Project from "../model/Project.js";
import Task from "../model/Tasks.js";
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await
        User.findOne({ email,username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPass0 =await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPass0
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);    
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFind = await User.findOne({ email });
    if (!userFind) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPassValid = await bcrypt.compare(password, userFind.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.user = {
      id: userFind._id,
      username: userFind.username,
      email: userFind.email,
    };

    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Session save error" });
      }
   
      return res.status(200).json({ message: "Login successful", user: req.session.user });
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProject = async (req, res) => {
    const userId = req.session.user ? req.session.user.id : null;
    try{
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const projects = await Project.find({ createdBy: userId }).populate('createdBy', 'username email');
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: "No projects found for this user" });
        }
        res.status(200).json({ projects });
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getTasks = async (req, res) => {
    const userId = req.session.user ? req.session.user.id : null;
    try {
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const tasks = await Task.find({ createdBy: userId }).populate('createdBy', 'username email');
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }
        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const logoutUser = (req, res) => {
    
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out user:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: "Logout successful" });
    });
}
export const  getUserInSession=(req, res) =>{
  if (req.session && req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "No user logged in" });
  }
}
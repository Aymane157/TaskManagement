import {registerUser,loginUser,logoutUser,getProject,getUserInSession,getTasks} from "../controller/UserController.js";
import {createProject,getNumberTask,updateProj} from "../controller/ProjectController.js";
import { createTask,deleteTask ,updateTask} from "../controller/TaskController.js";
import express from "express";
const router = express.Router();

router.post("/register", registerUser);
router.post("/createProject", createProject);
router.post("/createTask", createTask);
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/getProjet",getProject)
router.get("/getUserInSession",getUserInSession)
router.post("/numberTask",getNumberTask)
router.get("/tasks",getTasks)
router.post("/deltask",deleteTask)
router.post("/updateTaskStatus",updateTask)
router.put("/updateProjectStatus",updateProj)
export default router;

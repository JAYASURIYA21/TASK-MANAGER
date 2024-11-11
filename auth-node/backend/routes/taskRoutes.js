const express=require("express")
const { createTask,updateTask, getAllTask, getOneTask, deleteTask } = require("../controller/taskController")
const verifyToken = require("../middleware/verifyToken")

const router=express.Router()

router.post("/create-task",verifyToken,createTask)
router.get("/get-alltask",verifyToken,getAllTask)
router.get("/get-one-task/:id",verifyToken,getOneTask)
router.put("/update-task/:id",verifyToken,updateTask)
router.delete("/delete-task/:id",verifyToken,deleteTask)


module.exports=router
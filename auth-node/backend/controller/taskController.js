const TaskModel = require("../model/TaskModel");

const createTask = async (req, res) => {
  var { title, description, dueDate, priority, userId ,completed} = req.body;
  if (!title) return res.status(400).json({ msg: "title required" });
  if(dueDate.length<=0) dueDate=Date.now() + 24*60*60*1000
  console.log(dueDate,typeof(dueDate), "`````````````due date");
  

  try {
    const task = new TaskModel({
      title,
      description,
      priority,
      user: userId,
      completed,
      dueDate
    });

    const newTask = await task.save();
    console.log(newTask);
    res.status(200).json({ msg: "task creted successfully", task: newTask });
  } catch (err) {
    console.log(err);
    
    return res.status(400).json({ err });
  }
}

const getAllTask = async (req, res) => {
  try {
    const { userId } = req.body;
    const tasks=await TaskModel.find({user:userId})
    res.status(200).json({ msg: "get all tasks from this user", userId,tasks });
  } catch (err) {
    console.log(err);
    return res.status(400).json({error:err.message})
  }
};

const getOneTask=async(req,res)=>{
  const {userId,title,description,priority,dueDate,completed}=req.body
  const {id}=req.params
  try{
    if(!id) throw new Error("Task id not found");
    const task=await TaskModel.findById(id)
    if(!task) throw new Error("invalid task id");
    if(!task.user.equals(userId)) throw new Error("user not authenticated to this task")
    return res.status(200).json({task,msg:"request successfull"})
  }catch(err){
    return res.status(400).json({msg:err.message || "internal server error"})
  }

}

const updateTask=async(req,res)=>{
  const {userId,title,description,priority,dueDate,status,completed}=req.body
  const {id}=req.params
  console.log(completed);
  try{
    if(!id) throw new Error("Task id not found");
    const task=await TaskModel.findById(id)
    if(!task) throw new Error("invalid task id");
    if(!task.user.equals(userId)) throw new Error("user not authenticated to this task")
    task.title=title!==undefined ? title : task.title
    task.description=description!==undefined ? description :task.description
    task.priority=priority? priority : task.priority
    task.dueDate=dueDate? dueDate : task.dueDate
    task.status=status !==undefined? status : task.status
    task.completed=completed !==undefined? completed: task.completed
    
    const updatedTask = await task.save()
    
    return res.status(200).json({updatedTask,msg:"request successfull",completed})
  }catch(err){
    return res.status(400).json({msg:err.message || "internal server error"})
  }

}

const deleteTask = async(req,res)=>{
  const {userId}=req.body
  const {id}=req.params
  try{
    if(!id) throw new Error("Task id not found");
    const task=await TaskModel.findById(id)
    if(!task) throw new Error("invalid task id");
    if(!task.user.equals(userId)) throw new Error("user not authenticated to this task")
    await TaskModel.findByIdAndDelete(id)
    res.status(200).json({msg:"user deleted successfully"})

  }catch(err){
    console.log(err);
    return res.status(400).json({msg:err.message || "internal server error"})
  }

}

module.exports = { createTask, getAllTask, getOneTask,updateTask, deleteTask };

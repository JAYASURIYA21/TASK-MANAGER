const mongoose=require("mongoose")


const TaskSchema=new mongoose.Schema({
  title:{
    type:String,
    required:[true,"please provide a title"],
    unique:true
  },

  description:{
    type:String,
    default:"No description"
  },

  dueDate:{
    type:Date,
    default:Date.now()
  },

  status:{
    type:String,
    enum:["active","inactive"],
    default:"active"
  },

  completed:{
    type:Boolean,
    default:false
  },

  priority:{
    type:String,
    enum:["low","high","medium"],
    default:"low"
  },

  user:{
    type:mongoose.Schema.ObjectId,
    ref:"user",
    required:true
  }
},
{
  timestamps:true
})

const TaskModel= mongoose.model("Task",TaskSchema)

module.exports=TaskModel
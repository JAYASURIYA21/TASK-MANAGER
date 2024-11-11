const express=require('express')
const connectDB = require('./config/connectDB')
const AuthRouter=require('./routes/authroutes')
const path=require('path')
const app=express()
const cookieParser=require('cookie-parser')
const cors=require('cors')
const taskRouter = require('./routes/taskRoutes')
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

const PORT=process.env.PORT || 5001

app.use("/api/auth",AuthRouter)
app.use("/api/task",taskRouter)

const parentDir=path.dirname(__dirname)


if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(parentDir,"/frontend/dist")))
  app.get("*",(req,res)=>{
    console.log(__dirname);
    res.sendFile(path.resolve(parentDir,"frontend","dist","index.html"));
  })
}

connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log("server is running in port",PORT);
  })
})


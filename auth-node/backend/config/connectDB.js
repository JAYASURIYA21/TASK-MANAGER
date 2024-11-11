const mongoose=require('mongoose')

const connectDB=async()=>{
  try{
    const connect=await mongoose.connect(process.env.MONGODB_URI)
    console.log(`db connected ${connect.connection.port} ${connect.connection.name}`);
    
  }catch(err){    
    console.log(err);
    console.log("db not connected");   
  }
}

module.exports=connectDB
const UserModel = require("../model/user");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken")
const generateVerificationToken = require("../utils/generateVerificationToken");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const {SendverificationEmail,sendWelcomeEmail, forgetPasswordEmail, resetPasswordSuccessful} = require("../mail/email");
const generateResetPasswordToken = require("../utils/generateResetPasswordToken");
const validator=require('validator')


const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) throw new Error("Enter all fields");
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error("Email already exists");
    if(!validator.isEmail(email)) throw new Error("Enter valid email");
    
    
    const hashpassword=await bcrypt.hash(password,10)
    const verificationToken=generateVerificationToken()
    const user=UserModel({email,
      name,
      password:hashpassword,
      verificationToken,
      verificationExpiresAt: Date.now()+24*60*60*1000
    })
    const savedUser=await user.save()
    console.log("save---------------",savedUser);
    
    generateTokenAndSetCookie(res,savedUser._id)
    await SendverificationEmail(savedUser.email,verificationToken)
    res.status(201).json({
      msg:"user created successfully",
      user:savedUser 
    })
  } catch (err) {
    res.status(402).json({ msg: err.message });
  }
};

const verifyEmail=async(req,res)=>{
  const {code}=req.body

  const user=await UserModel.findOne({verificationToken:code,verificationExpiresAt:{$gt:Date.now()}})
  if(!user) return res.status(404).json({msg:"invaild verification code"})
    user.verificationToken=undefined
    user.verificationExpiresAt=undefined
    user.isVerified=true

    const data=await user.save()
    await sendWelcomeEmail(user.email,user.name)
    
    res.status(202).json({
      user:data,
      msg:"user verified successfulll"})  
}

const login = async (req, res) => {
  const {email,password}=req.body
  const user=await UserModel.findOne({email})
  if(!user) return res.status(400).json({msg:"user not found"})
  const isPasswordTrue=await bcrypt.compare(password,user.password)
  if(!isPasswordTrue) return res.status(400).json({msg:"invalid crediantails"})
  try{
    generateTokenAndSetCookie(res,user._id)
    user.lastLogin=Date.now()
    await user.save()
    return res.status(200).json({user,msg:"user logged in successfully"})
  }catch(err){
  return res.status(400).json({msg:"error from login auth"})
}
};


const logout = async (req, res) => {
  try{
    if(req.cookies?.token) return  res.clearCookie("token").json({msg:"user loged out successfully"})
    else throw new Error("token not found || user not Authenticated");
  }catch(err){
    res.status(400).json({msg:err.message})
  }
};


const forgetPassword=async(req,res)=>{
    const {email}= req.body
    console.log(email);
    try{
      const user=await UserModel.findOne({email})
      if(!user) return res.status(400).json({msg:"invalid user"})
      const resetPasswordToken=generateResetPasswordToken()
      user.resetPasswordToken=resetPasswordToken
      user.resetPasswordExpiresAt=Date.now()+60*60*1000
      await user.save()
      
      await forgetPasswordEmail(email,`${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)
      res.status(200).json({
        msg:"forget password link sent successfully",
        success:true
      })
    }catch(err){
      console.log("error from forget password auth controller");
      
      return res.status(400).json({
        msg:"error from forget password",
      })
    }
}


const resetPassword=async(req,res)=>{
  const {token}=req.params
  const {password}=req.body
  try{
    const user=await UserModel.findOne({resetPasswordToken:token,resetPasswordExpiresAt:{$gt:Date.now()}})
    if(!user) return res.status(400).json({msg:"reset token not found || user not found "})
    const hashedPassword=await bcrypt.hash(password,10)
    user.password=hashedPassword
    await user.save()
    await resetPasswordSuccessful(user.email,user.name)
    res.status(200).json({
      msg:"reset password successfull",
      success:true
    })
    

  }catch(err){
    console.log("error from reset password authcontroller",err);
    res.status(400).json({msg:"error from reset password"})
    
  }
  

}

const checkAuth=async(req,res)=>{
  const {userId}=req.body
  try{
    const user=await UserModel.findById(userId).select("-password")
      if(!user) return res.status(404).json({msg:"user not found",error:"true"})
      return res.status(200).json({msg:"auth successfull",user,success:true})
  }catch(err){
    console.log("error from checkAuth",err);
    res.status(404).json({msg:"something went wrong in checkAuth",err:err})
  }

}

module.exports = { signup, login, logout, verifyEmail,forgetPassword,resetPassword,checkAuth };

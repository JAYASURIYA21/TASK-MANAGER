const express=require('express')
const { logout, login, signup, verifyEmail, forgetPassword, resetPassword, checkAuth } = require('../controller/authcontoller')
const verifyToken = require('../middleware/verifyToken')
const router=express.Router()


router.post("/signup",signup)


router.post("/login",login)


router.get("/logout",logout)

router.post("/verify-email",verifyEmail)

router.post("/forgot-password",forgetPassword)

router.post("/reset-password/:token",resetPassword)

router.get("/check-auth",verifyToken,checkAuth)

module.exports=router
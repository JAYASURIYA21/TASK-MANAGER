const crypto=require('crypto')

const generateResetPasswordToken=()=>{
  return crypto.randomBytes(20).toString('hex')
}

module.exports=generateResetPasswordToken
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./emailTemplates");
const { sender, client } = require("./mailtrapConfig");


const SendverificationEmail=async(email,verificationCode)=>{
  const recipients = [
    {
      email
    }
  ];
  try{
    const response=await client
    .send({
      from: sender,
      to: recipients,
      subject: "verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationCode),
      category: "Email verification",
    })
    console.log("msg from email verification",response);
    
  }catch(err){
    console.error(err)
  }

}


const sendWelcomeEmail=async(email,name)=>{
  const recipients=[{email}]
  try{
    const response=await client.send({
      from:sender,
      to:recipients,
      subject:`welcome ${name}`,
      text:"welcome ! happy journey with out website" 
    })
    console.log("log from welcome email",response);
  }catch(err){
    console.log(err);
  }
}


const forgetPasswordEmail=async(email,resetPasswordUrl)=>{
  const recipients=[{
    email
  }]

  try{
    const response=await client.send({
      from:sender,
      to:recipients,
      subject:"reset your password",
      html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetPasswordUrl),
      category:"password reset"
    })
  }catch(err){
    console.log("error from forget password email",err);
    return res.json({
      msg:"error from forget password email",
      error:err
    })
  }

}


const resetPasswordSuccessful=async(email,name)=>{
  const recipients=[{email}]
  try{
    const response=await client.send({
      from:sender,
      to:recipients,
      subject:"reset password successfull",
      html:PASSWORD_RESET_SUCCESS_TEMPLATE,
      category:"password reset successfull"
    })
  }catch(err){
    console.log("error from reset password successfull");
  }

}

module.exports={SendverificationEmail,sendWelcomeEmail,forgetPasswordEmail,resetPasswordSuccessful}
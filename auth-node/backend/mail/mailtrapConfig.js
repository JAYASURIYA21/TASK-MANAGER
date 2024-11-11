const { MailtrapClient } = require("mailtrap");
require('dotenv').config()

const TOKEN =process.env.MAILTRAP_TOKEN;


const client = new MailtrapClient({
  token: TOKEN,
});


const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

module.exports={sender,client}
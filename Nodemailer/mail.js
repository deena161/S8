const nodemailer = require('nodemailer');

// Create a transporter (using SMTP for this example)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587, 
  auth: {
    user: 'deenadhayalan.ec21@bitsathy.ac.in',
    pass: '950082s*SSS' 
  }
});

// Define email options
const mailOptions = {
//   from: 'deenadhayalan.ec@gmail.com',
  to: 'monika.ec21@bitsathy.ac.in',
  subject: 'Testing Mail',
  text: 'Hello Monika S. This is Deenadhayalan!'
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent:', info.response);
  }
});
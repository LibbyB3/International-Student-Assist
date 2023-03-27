const express = require("express");
const { validateToken } = require("../JWT");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto")
const {User , Task} = require("../model/user")
const bcrypt = require('bcryptjs')

const router = express.Router();
router.use(cookieParser());
router.use(validateToken);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  res.clearCookie("access-token");
  res.redirect("login");
});

router.get("/about", (req, res) => {
  res.render("aboutUs");
});

router.get("/contact", (req, res) => {
  res.render("contactUs");
});

router.post("/sendemail", async (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;
  const userOutput = `
  <h3>Dear ${req.body.name},</h3>

  <p>Thank you for contacting us! We have received your message and will get back to you as soon as possible.</p>
  <p> Best regards,</p>
  <p> International Student Assist Team </p>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    //service: "gmail",
    //port: 587,
    //secure: false, // true for 465, false for other ports
    auth: {
      user: "libbyblair13@gmail.com", // generated ethereal user
      pass: "hjhaclobgyfhnztl", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOptions = await transporter.sendMail({
    from: '"ISA Message" libbyblair13@gmail.com', // sender address
    to: "internationalstudentassistapp@gmail.com", // list of receivers
    subject: "Contact Form Message", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });
  let userMailOptions = await transporter.sendMail({
    from: '"ISA Message" libbyblair13@gmail.com', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: "Thank you for contacting us!", // Subject line
    text: "Hello world?", // plain text body
    html: userOutput, // html body
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  transporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return res.render("contactUsSuccess");
  });
});

router.route("/forget-password")
  .get((req,res) =>{
    res.render("forget-password");
  })
  .post(async (req,res) =>{
    try{
      const { email } = req.body;
      
      //Generate reset token
      const token = crypto.randomBytes(20).toString('hex');

      const user = await User.findOne({ email });

      if(!user){
        return res.render("forget-password" , {message: "User not found"})
      }

      // Save the password reset token and expiry date to the user's document
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();
      
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        //service: "gmail",
        //port: 587,
        //secure: false, // true for 465, false for other ports
        auth: {
          user: "libbyblair13@gmail.com", // generated ethereal user
          pass: "hjhaclobgyfhnztl", // generated ethereal password
        },
      });

      // Create the email message
      const mailOptions = {
        from: '"ISA Message" libbyblair13@gmail.com',
        to: email,
        subject: 'Reset your password',
        text: `Hi ${user.name},\n\n` +
          'You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          `http://${req.headers.host}/reset-password/${token}\n\n` +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.render("forget-password" , {message: "Check Email for reset link"})
    }catch(error){
      console.error(error)
      res.render("forget-password" , {message: "An Error Occurred"})
    }
  })


router.route('/reset-password/:token')
  .get((req,res) => {
    const {token} = req.params
    return res.render("reset-password", {token});
  })
  .post(async (req,res) =>{
    try {
      const { token } = req.params;
      console.log(req.params.token)
      console.log(req.params)
      const { password } = req.body;

      // Find the user with the specified password reset token
      const user = await User.findOne({
        where: {resetPasswordToken: token}
      });

      console.log(user)

      if (!user) {
        return res.render("reset-password" , {message: 'Invalid or expired token'});
      }

      // Set the new password and clear the reset password fields
      const hashedPassword = await bcrypt.hash(password, 8);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      console.log(user)

      res.render("reset-password" , {message: 'Password reset successfully, Please Login'});
    } catch (error){
        console.error(error)
        res.render("reset-password" , {message: "An Error Occurred"});
      }
  })


module.exports = router;

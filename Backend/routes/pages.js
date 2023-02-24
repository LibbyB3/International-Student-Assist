const express = require("express");
const { validateToken } = require("../JWT");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

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
    to: "blaire51@lsus.edu", // list of receivers
    subject: "Contact Form Message", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return res.render("contactUs", {
      message: "Message Sent",
    });
  });
});
module.exports = router;

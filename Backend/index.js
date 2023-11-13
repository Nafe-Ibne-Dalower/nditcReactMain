/******************
 * Title: NDITC
 * Description: NDITC Main Backend
 * Author: 'Nafe Ibne Dalower'
 * Date: 2023-11-13
 *******************/
// Dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const { url } = require("inspector");
const path = require("path");
const mailer = require('nodemailer')
// Main
app.use(bodyParser.urlencoded({ extended: true }));
const http = require("https");

// EXPRESS SPECIFIC STUFF
app.use(express.static(path.join(__dirname, "../public"))); // For serving static files

// Post Request Handler
app.post("/send-email", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.msgt;

  // nodemailer transporter
  const trnsp = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "ktprodhan@gmail.com",
      pass: "nwckpxrnvylffcyp",
    },
  });
  const options = {
    from: "ktprodhan@gmail.com",
    to: "ktprodhan@gmail.com",
    subject: `Mail from nditc-website ${Date.now}`,
    text:message,
  };


  // Send email
  trnsp.sendMail(options, (error, info) => {
      if (error) {
          return res.status(500).send(error.toString());
      }
      res.send('Email sent: ' + info.response);
  });
  res.status(200).sendFile(path.join(__dirname,'../public/emailResponse.html'));  
});

const port = 3000;

app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);

// Export the Express API
module.exports = app;
/***************** End ******************/

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
const path = require("path");
const mailer = require('nodemailer')
const cors = require('cors')

// Main
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());


// EXPRESS SPECIFIC STUFF
app.use(express.static(path.join(__dirname, "../public"))); // For serving static files

// Post Request Handler
app.post("/send-email", (req, res) => {
  const { nameOfSender, email, msgt} = req.body;
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
    subject: `Mail from nditc-website`,
    text:`From: ${nameOfSender}\nEmail: ${email}\nText: ${msgt}`,
  };
  
  
  // Send email
  trnsp.sendMail(options, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
      }
      res.send('Email sent: ' + info.response);
  });
});

const port = 3000;

app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);

// Export the Express API
module.exports = app;
/***************** End ******************/

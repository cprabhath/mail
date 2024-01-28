const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.post('/send-email', (req, res) => {
  const from = req.body.from;
  const message = req.body.message;

  const mailOptions = {
    from: from,
    to: process.env.EMAIL_USER,
    subject: "Feedback of AI toolkit",
    text: from + " is commenting "+ "\n\n" + message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send('Error sending email');
    } else {
      res.status(200).send('Thank you for your feedback');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

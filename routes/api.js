const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const Mailing = {};

const oauth2Client = new OAuth2(
  process.env.MAILING_SERVICE_CLIENT_ID,
  process.env.MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
);

/* POST route for Kaizen form */
router.post('/kaizen', async (req, res, next) => {
  try {
    await sendEmail(req.body, 'Kaizen Academy');
    res.redirect('/success');
  } catch (e) {
    console.log(e);
    res.redirect('/kaizen');
  }
});

/* POST route for Field form */
router.post('/field', async (req, res, next) => {
  try {
    await sendEmail(req.body, 'Field Sessions');
    res.redirect('/success');
  } catch (e) {
    console.log(e);
    res.redirect('/field');
  }
});

function sendEmail(form, requestType) {
  // Set Up OAuth Credentials
  oauth2Client.setCredentials({
    refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN
  });

  // Get the access token
  const accessToken = oauth2Client.getAccessToken();

  // Create a Nodemailer transporter using SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.SENDER_EMAIL_ADDRESS,
      clientId: process.env.MAILING_SERVICE_CLIENT_ID,
      clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
      accessToken
    }
  });
  
  // Set up message options
  let message = {
    from: form.email, // for Google Auth
    to: process.env.SENDER_EMAIL_ADDRESS, // list of receivers
    subject: `${requestType.toUpperCase()}: ${form.name}, ${form.email}`, // Subject line
    generateTextFromHTML: true,
    html: form.about, // plain text body
  }

  // Deliver the message object using the sendMail() method of transporter
  // send mail with defined transport object
  transporter.sendMail(message, (err, info) => {
    console.log(message);
    if(err){
      console.log(err);
    }else{
      console.log(info);
    }
  });
  
  return form;
}

module.exports = router;

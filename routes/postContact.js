var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();
var myPassword = process.env.myPassword;
var myEmail = process.env.myEmail;
var myContactEmail = process.env.myContactEmail;

/* POST details from contact form */
router.post('/', function (req, res, next) {

  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;

  var errors = null;

  req.check('name', 'Please fill in your name.\r\n').isLength({min: 1});
  req.check('email', 'Please fill in your email. \r\n').isLength({min: 1});
  req.check('email', 'Please type in a valid email address. \r\n').isEmail();
  req.check('subject', 'Please fill in the subject. \r\n').isLength({min: 1});
  req.check('message', 'Please write your message. \r\n').isLength({min: 1});
  errors = req.validationErrors();
  console.log("errors: ", errors);

  if(errors) {
    res.json({result: errors, success: false });
  } else {
    var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: myEmail, // Your email id
                pass: myPassword // Your password
            }
    });

    var mailOptions = {
      from: myContactEmail, // sender address
      to: myEmail, // list of receivers
      subject: subject, // Subject line
      html: '<p>From: '+name+'</p>'+
            '<p>Subject: '+subject+'</p>'+
            '<p>Message: <br/>'+message+'</p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({result: [{msg:'There was an error sending your message.  Please try again later.'}], success: false });
        }else{
            console.log('Message sent: ' + info.response);
            res.json({result: [{msg:'Your message was sent successfully!'}], success: true});
        }
    });

  }

});

module.exports = router;

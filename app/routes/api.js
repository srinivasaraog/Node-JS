const Tokens = require('../models/Token');
const User = require('../models/user');
const config = require('../../config');
const mongoose = require('mongoose');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

const secretKey = config.secretKey;

const jsonwebtoken = require('jsonwebtoken');

const bcrypt = require('bcrypt');

function createToken(user) {
  const token = jsonwebtoken.sign({
    _id: user._id,
    email: user.email

  }, secretKey, {
      expiresIn: 1440
    });

  return token;
}


module.exports = function (app, express) {

  const api = express.Router();


  api.post('/signup', function (req, res) {

    console.log("req....................", req.body);


    var user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.password
    });





    // Make sure this account doesn't already exist
    User.findOne({ email: req.body.email }, function (err, user) {

      // Make sure user doesn't already exist
      if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });

      // Create and save the user
      user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.password
      });

      user.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }

        // Create a verification token for this user
        var token = new Tokens({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        console.log("token generated", token)
        // Save the verification token
        token.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
          console.log("save token")
          // Send the email
         //var transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: "rideshareapp@gmail.com", pass: "sweety1234" } });
         var options = {
          auth: {
            api_user: "srinivas17jan",
            api_key: "rideshare1"
          }
        }
        
        var transporter = nodemailer.createTransport(sgTransport(options));
          console.log("transporter generated", transporter);
          var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host+ '\/api/confirmation\/' + token.token + '.\n' };
          transporter.sendMail(mailOptions, function (err) {

            console.log("send email using transporter");
            
            if (err) { console.log("send email using transporter error", err.message); return res.status(500).send({ msg: err.message }); }
           
            res.json({ status: 200, message: "A verification email has been sent to"+ user.email  });
          });
        });
      });
    });


  });

  //find a specific object using findOne
  //will check the db whether the user is existing or not
  api.post('/login', function (req, res) {

    User.findOne({ email: req.body.email},function (err, user) {
      console.log("user..........",user);
      if (err ) {
        throw err;
      }

      if (!user) {
        res.send({ message: "user doesnot exist" });
      } else if(!user.isVerified){
      
        res.send({ message: "user is not verified" });

      }else if (user) {
        const  validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.send({ message: "Invalid password" });
        } else {
          const token = createToken(User);
          res.json({
            sucess: true,
            message: "sucessfully login",
            token: token
          });
        }
      }

    });



  });


  api.get('/users', function (req, res) {


    User.find({}, function (err, users) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(users);
    })

  });


  api.get('/confirmation/:token', function (req, res) {

    console.log("hiiiii....",req.params.token)

    // Find a matching token
    Tokens.findOne({ token: req.params.token.replace('.','') }, function (err, token) {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
      console.log("inside token generation")
      // If we found a token, find a matching user
      User.findOne({ _id: token._userId }, function (err, user) {
        console.log("is user existing in the data base");
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
        if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

        // Verify and save the user
        user.isVerified = true;
        user.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
          //res.status(200).send("The account has been verified. Please log in.");
          return res.redirect("http://localhost:8100");
        });
      });
    })
  })

  console.log("api......", api)
  return api
}






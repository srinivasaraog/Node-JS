const User=require('../models/user');
const config=require('../../config');

const secretKey=config.secretKey;

const jsonwebtoken=require('jsonwebtoken');

function createToken(user){
const token=  jsonwebtoken.sign({
    _id:user._id,
    email:user.email

  },secretKey,{
    expiresIn:1440
  });

  return token;
}
module.exports=function(app,express){

const api= express.Router();

api.post('/signup', function (req, res) {

  console.log("req....................",req.body)
   var user= new User({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      password:req.body.password,
      confirmpassword:req.body.password
    });

    user.save(function(err){
         console.log("after user saaved");
      	  if(err){
      	  	  return res.send(err);
        }
        console.log("user created", res)
        res.json({status:200,message:'usercreated'});
    });
  });

//find a specific object using findOne
//will check the db whether the user is existing or not
  api.post('/login', function (req, res) {

    User.findOne({
      email:req.body.email
    }).select('password').exec(function(err,user){
       if(err){
         throw err;
       }
       if(!user){
          res.send({message:"user doesnot exist"});
       }else if(user){
         const validPassword=user.comparePassword(req.body.password);
        if(!validPassword){
          res.send({message:"Invalid password"});
        }else{
           const token=createToken(user);
           res.json({
             sucess:true,
             message:"sucessfully login",
             token:token
           });
        }
       }

    })



  });


  api.get('/users', function (req, res) {


     User.find({},function(err,users){
         if(err){
           res.send(err);
           return;
         }
         res.json(users);
     })

  });
  console.log("api......",api)
  return api
}

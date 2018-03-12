var express =require('express');
var bodyParser =require('body-parser');
var morgan=require('morgan');
var config= require('./config');
var cors = require('cors');

//email verification



var mongoose = require('mongoose');
var app=express();
app.use(cors());

mongoose.connect(config.database,function(err){
  if(err){
    console.log(err);
  }else{
    console.log("connected to the data base")
  }
})
app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
//Max upload size.
//client_max_body_size  5 ;

app.use(morgan('dev'));

const api=require('./app/routes/api')(app,express);
app.use('/api',api);



 app.listen(config.port, function(err){
   if(err){
     console.log(err);

   }else{
     console.log("listening on port 3000");
   }
 })


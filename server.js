var express =require('express');
var bodyParser =require('body-parser');
var morgan=require('morgan');
var config= require('./config');
var cors = require('cors')
const mongoose = require('mongoose');
var app=express();
app.use(cors());
mongoose.connect(config.database,function(err){
  if(err){
    console.log(err);
  }else{
    console.log("connected to the data base")
  }
})
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

const api=require('./app/routes/api')(app,express);
app.use('/api',api);


app.get("*",function(req,res){
  res.sendFile(__dirname + 'public/views/index.html')
});
 app.listen(config.port, function(err){
   if(err){
     console.log(err);

   }else{
     console.log("listening on port 3000");
   }
 })
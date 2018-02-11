const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const bcrypt=require('bcrypt');





const loginSchema =new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmpassword: {
    type: String,
    required: true
  },
  roles: [{ type: 'String' }],
  isVerified: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date
});

loginSchema.pre('save',function(next){
const user =this;
if(!user.isModified('password'))
 return next();



 bcrypt.hash(user.password, 5, function(err, hash) {
   if(err)
       return next(err);

    user.password=hash;
    console.log(user.password);
    next();

});

});

loginSchema.methods.comparePassword=function(password){
  const user=this;
  console.log("compareSync hash",user);
  return bcrypt.compareSync(password,user.password);
}


const User = module.exports = mongoose.model('users', loginSchema);
module.exports=User;

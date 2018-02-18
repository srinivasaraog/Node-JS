const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const bcrypt=require('bcrypt');





const offerRideSchema =new Schema({
	  _id: {
		type: String,
		required: true
	  },
      from: {
        type: Object,
        required: true
        
      },
      to: {
        type: Object,
        required: true
        
      }
      
  
});






const offerRide = module.exports = mongoose.model('offerRide', offerRideSchema);
module.exports=offerRide;

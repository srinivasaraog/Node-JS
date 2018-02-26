const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');





const offerRideSchema = new Schema({



  user_id: {
    type: String,
    required:true
   
  },
  profile: [{
    
    from: {
      type: Object,
      required: true

    },
    to: {
      type: Object,
      required: true

    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },

    distance:{
      type:String,
      required:true
    }
  }]

});






const offerRide = module.exports = mongoose.model('offerRide', offerRideSchema);
module.exports = offerRide;

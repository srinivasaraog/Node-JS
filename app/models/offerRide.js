const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const geoschema = require('./geolocation')
const bcrypt = require('bcrypt');

//var GeoJSON = require('mongoose-geojson-schema');

var GeoSchema = new Schema({

  type:{
      type:String,
      default:"Point"

  },
  coordinates:{
    type:[Number],
    index:"2dsphere"
  }

    
});

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
    distance: {
      type: String,
      required: true
    },
    seatsAvailable:{
      type:String,
      required:true
    },
    user_id: {
      type: String,
      required:true
     
    },
    
   photo: { 
    type:Object,
    required:false
   },
   
   confirmation:[{

    ridesInQueue:{
      type: Object,
      required: false
    }
   }]
    
  
  }],
  

   geometry:GeoSchema

   

});


offerRideSchema.index({ geometry: '2dsphere' })

const offerRide = module.exports = mongoose.model('offerRide', offerRideSchema);
module.exports = offerRide;


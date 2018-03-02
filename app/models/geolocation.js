
var mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 


 
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



const geoschema = module.exports = mongoose.model('geoschema', GeoSchema);
module.exports = geoschema;


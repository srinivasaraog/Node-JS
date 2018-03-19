// Set the connection string based from the config vars of the production server
// To run locally use 'mongodb://localhost/Project-x' instead of process.env.DB

module.exports = {
  "database": 'mongodb://127.0.0.1:27017/local',
  "port":process.env.port || 3000,
  "secretKey":"abcd"

};
//'mongodb://127.0.0.1::27017/login'
//'mongodb://127.0.0.1:27017/local',
//mongodb://username:password.mongolab.com:#####/db


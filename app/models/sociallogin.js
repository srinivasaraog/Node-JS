

var socialLoginClass    = require("social-login");

var socialLogin			= new socialLoginClass({
    app:	app,    // ExpressJS instance
    url:	'http://127.0.0.1:5000',  // Your root url
    onAuth:	function(req, type, uniqueProperty, accessToken, refreshToken, profile, done) {
        
        // This is the centralized method that is called when the user is logged in using any of the supported social site.
        // Setup once and you're done.
        
        findOrCreate({
            profile:	profile,        // Profile is the user's profile, already filtered to return only the parts that matter (no HTTP response code and that kind of useless data)
            property:	uniqueProperty, // What property in the data is unique: id, ID, name, ...
            type:		type            // What type of login that is: facebook, foursquare, google, ...
        }, function(user) {
            done(null, user);   // Return the user and continue
        });
    }
});

const socialLogin = module.exports = mongoose.model('users', socialLogin);
module.exports=socialLogin;

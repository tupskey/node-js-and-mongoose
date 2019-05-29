var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/users');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
/* for sessions */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* this is assgined to a a user that ones to log in */
exports.getToken = function(user) {
	return jwt.sign(user, config.secretKey, 
		{expiresIn: 3600});
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, 
	(jwt_payload, done) => {
		/* The done above takes three parameters which include err, user, any */
		 console.log("JWT payload", jwt_payload);
		 User.findOne({_id: jwt_payload._id}, (err, user) => {
		 	if (err) {
		 		return done(err, false);
		 	}
		 	else if (user) {
		 		return done(null, user);
		 	}
		 	else{
		 		return done(null, false);
		 	}
		 });
	}));

exports.verifyUser = passport.authenticate('jwt', {session: false});
exports.verifyAdmin = (req, res, next) => {
			if (req.user.admin) {
				next();
			}
			else{
				var err = new Error('You are not an Admin');
				err.status = 403;
				return next(err);
			}
};

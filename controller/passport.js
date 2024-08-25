const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT  = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const user = require('./user');
const dotenv = require('dotenv');
dotenv.config();

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET_KEY
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return user.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));
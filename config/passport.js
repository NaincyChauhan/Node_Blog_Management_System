const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const passport = require('passport');
const db = require('../models');
const User = db.User;

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

require('dotenv').config();

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        const user = await User.findByPk(jwt_payload.id);
        if (!user) return done(null, false);

        // Success, return user
        return done(null, user);

    } catch (error) {
        done(error, false)
    }
}));

module.exports = passport;

// Hi,  I am developing a Node.js project with a PostgreSQL database and React.js for the front end. I have Create dAPIs for registration, login, and logout with proper validation, security, performance, and best industry-level practices. Use Passport and passport-jwt, etc. The API should work properly when I call it from React.js and should be safe, following best practices. Database is working properly, you just need to create api and implement passport-jwt.

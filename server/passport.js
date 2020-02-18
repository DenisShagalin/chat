const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtToken = ('access', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'JwtAccessSecret',
  passReqToCallback: false
}, function (payload, done) {
  return done(null, payload);
})
);

module.exports = { jwtToken: jwtToken };

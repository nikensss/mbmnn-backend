import passport from 'passport';
import pjwt from 'passport-jwt';
import User from '../models/User';

const { Strategy, ExtractJwt } = pjwt;
const secret = process.env.SECRET;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

const strategy = new Strategy(options, (payload, next) => {
  User.findOne({ _id: payload.id }, (err, user) => {
    if (err) return next(err);
    //a valid token with invalid User._id will give a 401 HTTP status message
    return next(null, user);
  });
});

passport.use(strategy);

export default passport;
export { secret };
export const auth = passport.authenticate('jwt', {session: false});
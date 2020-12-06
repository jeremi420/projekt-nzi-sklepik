import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import FacebookTokenStrategy from "passport-facebook-token";
import models from "../models";

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "bla",
        },
        function (payload, done) {
            models.User.findOne({ where: { id: payload.id } })
                .then((user) => done(null, user))
                .catch((err) =>
                    done(err, null, {
                        success: false,
                        message: "niezalogowano",
                    })
                );
        }
    )
);

passport.use(
    new FacebookTokenStrategy(
        {
            clientID: "133304578333329",
            clientSecret: "034c518bea587668df9a898d7e834afa",
        },
        function (accessToken, refreshToken, profile, done) {
            models.User.findOrCreate({ where: { facebookId: profile.id } })
                .then((user) => {
                    user.email = profile.emails[0].value;
                    user.save()
                        .then(() => done(null, user))
                        .catch((err) => done(err, null));
                })
                .catch((err) => done(err, null));
        }
    )
);

export default passport;

// import express from "express";
// import passport from "passport";
// import { getUsers, query } from "../db/postgres";
// import FacebookTokenStrategy from "passport-facebook-token";
// import jwt from "jsonwebtoken";

// const router = express.Router({ mergeParams: true });

// const secret = "lecaKlakiKoloSraki";

// const generateToken = (req, res, next) => {
//     req.token = jwt.sign(
//         {
//             id: req.auth.id,
//         },
//         secret,
//         { expiresIn: 60 * 120 }
//     );
//     next();
// };

// const sendToken = (req, res, next) => {
//     res.setHeader("x-auth-token", req.token);
//     return res
//         .status(200)
//         .send(JSON.stringify({ user: req.user, redirect: "/" }));
// };

// passport.use(
//     new FacebookTokenStrategy(
//         {
//             clientID: "133304578333329",
//             clientSecret: "034c518bea587668df9a898d7e834afa",
//         },
//         function (accessToken, refreshToken, profile, done) {
//             const email = profile.emails[0].value;
//             query(
//                 "SELECT * FROM USERS WHERE email = $1",
//                 [email],
//                 (err, res) => {
//                     const user = res.rows[0];
//                     if (!user) {
//                         query(
//                             "INSERT INTO users (email) VALUES ($1) RETURNING *",
//                             [email],
//                             (err, res) => {
//                                 console.log(`err: ${err} res: ${res.rows}`);
//                                 const newUser = res.rows[0];
//                                 done(err, newUser);
//                             }
//                         );
//                     } else {
//                         done(err, user);
//                     }
//                 }
//             );
//         }
//     )
// );

// router.post(
//     "/login/username",
//     async (req, res, next) => {
//         const { email, password } = req.body;
//         const q = await query("SELECT * FROM users");
//         const users = q.rows;
//         const user = users.find(
//             (u) => u.email === email && u.password === password
//         );
//         if (user) {
//             req.user = user;
//         }
//         next();
//         // if (user) {
//         //     return res.json({
//         //         success: true,
//         //         redirect: "/",
//         //         userId: user.user_id,
//         //     });
//         // } else {
//         //     return res.json({
//         //         success: false,
//         //         message: "nieprawidłowa nazwa użytkownika/hasło",
//         //     });
//         // }
//     },
//     (req, res, next) => {
//         if (!req.user) {
//             return res.send(401, "User Not Authenticated");
//         }
//         req.auth = {
//             id: req.user.user_id,
//         };
//         next();
//     },
//     generateToken,
//     sendToken
// );

// router.post(
//     "/login/facebook",
//     passport.authenticate("facebook-token", { session: false }),
//     (req, res, next) => {
//         if (!req.user) {
//             return res.send(401, "User Not Authenticated");
//         }
//         req.auth = {
//             id: req.user.user_id,
//         };
//         next();
//     },
//     generateToken,
//     sendToken
// );

// export default router;

import { Router } from "express";
import { signIn, signUp } from "../controllers/user";

const router = Router({ mergeParams: true });

router.post("/signin", signIn);
router.post("/signup", signUp);

export default router;

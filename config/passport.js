// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// require("dotenv").config();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,  // ✅ Ensure this is correctly set
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // ✅ Ensure this is correctly set
//       callbackURL: "http://localhost:5000/api/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         console.log("Google Profile:", profile);
//         // Handle user authentication logic
//         return done(null, profile);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

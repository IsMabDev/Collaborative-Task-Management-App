const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../models/prismaClient");
const userModel=require('../models/userModel')

module.exports = (app) => {
    app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
    app.get("/login", (req, res) => {
     res.render("login");
      });

  
  
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" }, // Explicitly define the field names

    async (email, password, done) => {

      // 1. Look up the user in the database.
      const user = await userModel.getUserbyEmail(email);

      if (!user) {
        // 2. If the user doesn't exist, return an error.
        return done(null, false, { message: "Invalid email or password" });
      }

      // 3. Verify the password.
      // const isMatch = await bcrypt.compare(password, user.password);
      const isMatch = password === user.password;

      if (!isMatch) {
        // If the password is incorrect, return an error.
        return done(null, false, { message: "Invalid email or password" });
      }

      // 4. Authentication successful.
      return done(null, user);
    }
  )
);
 

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.getUserbyId(id);
    done(null, user);
  });

  app.use(passport.session());
  
app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
})  )
  

};  


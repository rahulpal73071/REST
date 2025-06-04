const express = require('express');
const app = express();
const session = require("express-session");
const passport = require("passport");
require("./config/passport");
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authyRoutes = require('./routes/authyRoutes');
app.use(express.json());

app.use('/user' , userRoutes);
app.use('/book' , bookRoutes);
app.use('/auth' , authyRoutes);

app.use(session({
  secret: 'your_secret_key',     // Replace with a strong secret in production
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send(`<h1>Welcome</h1><a href="/auth/google">Login with Google</a><br><a href="/auth/github">Login with GitHub</a>`);
});

module.exports = app;
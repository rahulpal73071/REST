const express = require('express');
const router = express.Router();
const passport = require("passport");
const {
    register,
    login
} = require('../controllers/authyController');

const verifyToken = require('../middlewares/authyMiddleware');
const checkAdmin = require('../middlewares/rollMiddleware');

router.get('/admin-data', verifyToken, checkAdmin('admin'), (req, res) => {
  res.send("This is admin-only data.");
});
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});


router.post('/register' , register);
router.post('/login' , login);


// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

// Profile route
router.get("/profile", (req, res) => {
  if (!req.user) return res.redirect("/");
  res.json(req.user);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});


module.exports = router;
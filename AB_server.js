if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express');
  const app = express();
  const LocalStrategy = require('passport-local').Strategy;
  const bcrypt = require('bcrypt');
  const passport = require('passport');
  const flash = require('express-flash');
  const session = require('express-session');
  const methodOverride = require('method-override');
  const path = require('path');

  require('dotenv').config()
  console.log(process.env.SESSION_SECRET)
  
  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  
  const users = []
  
  // Set the folder for static files
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.urlencoded({ extended: false }))
  
  app.use(flash())
  app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false
  }))   
  
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  
  app.get('/', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'AB_HomeUI.html'))
  })
  
  // Sign-in route
app.get('/SignIn', checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'AB_SignIn.html'));
});

// Sign-up route
app.get('/SignUp', checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'AB_signup_pg2.html'));
});

// Sign-up post request
app.post('/SignUp', checkNotAuthenticated, async (req, res) => {
  // ... the provided code
});

// Sign-in post request
app.post('/SignIn', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/SignIn',
  failureFlash: true,
}));

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/SignIn');
});
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/SignIn')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
  app.listen(5500)
  
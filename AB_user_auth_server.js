/* Server-side script written in Node.js using the Express.js framework.
Implements a basic user authentication system using the passport-local
strategy for Passport.js.*/

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
const { createPool } = require('mysql2/promise');

// Create a connection to your database
const db = createPool({
  host: 'ls-5a1a450da9b72ee816d64ca751459a1171836a83.c9iwyumu4w7q.us-west-2.rds.amazonaws.com',
  user: 'dbmasteruser',
  password: 'Wasfiothman1',
  database: 'newab',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.log('Error connecting to the database:', error));

require('dotenv').config()
console.log(process.env.SESSION_SECRET)

const initializePassport = require('./passport-config');
initializePassport(passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const users = [];

// Set the folder for static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'AB_HomeUI.html'));
});

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
  try {
      // Generate a hashed password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Prepare user data
      const userData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          bday: req.body.bday,
          phoneNumber: req.body.phoneNumber
      };

      // Insert the user
      const insertResult = await db.execute("INSERT INTO users SET ?", userData);

      // Display a confirmation message
      console.log('User created successfully:', req.body.email);
      res.redirect('/SignIn');

  } catch (error) {
      // Display error message if the user creation fails
      console.error('Error during sign-up process:', error);
      res.redirect('/SignUp');
  }
});

// Sign-in post request
app.post('/SignIn', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/SignIn',
  failureFlash: true,
}));

// Implement Signout route using logout
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
  
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const app = express();
const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'origin, X-Requested-With, Content-Type, Accept, Z-key');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
    })
    .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }))
    .use(cors({ origin: '*' } ))
    .use('/', require('./routes'));

    passport.use(new githubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
    ));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', { 
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {console.log(`Running on port ${PORT}`);});
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser });
});

// on sessions form submit (log in)
router.post('/', (req, res) => {

    User.findOne({ username: req.body.username }, (err, foundUser) => {
        // Database error
        if (err) {
            console.log(err);
            res.send('oops the db had a problem');
        } else if (!foundUser) {
            // if found user is undefined/null not found etc
            res.send('<a  href="/">Sorry, no user found </a>');
        } else {
            // If user is found then check if passwords match
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                // If passwords match add user to session
                req.session.currentUser = foundUser;
                // After adding to session, redirect to homepage
                res.redirect('/');
            } else {
                // If the passwords don't match
                res.send('<a href="/"> password does not match </a>');
            }
        }
    });
});

router.delete('/', (req, res) => {
    console.log(req.session);
    req.session.destroy(() => {
        console.log(req.session);
        res.redirect('/');
    });
});

module.exports = router;
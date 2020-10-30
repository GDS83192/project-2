const router = require('express').Router();
const AppUser = require('../models/appuser').AppUser;
const Tip = require('../models/appuser').Tip;

// INDEX
router.get('/', (req, res) => {
    AppUser.find({}, (error, allAppUsers) => {
        res.render('appusers/index.ejs', {
            appUsers: allAppUsers,

        });
    });
});


router.get('/new', (req, res) => {
    res.render('appusers/new.ejs');
});

router.post('/', (req, res) => {
    AppUser.create(req.body, (error, appUser) => {
        res.redirect(`/appusers/${appUser.id}`);
    });
});

// ADD EMPTY FORM TO USER SHOW PAGE TO ADD TWEET TO A USER
router.get('/:appUserId', (req, res) => {
    // find user in db by id and add new tweet
    AppUser.findById(req.params.appUserId, (error, appUser) => {
        res.render('appusers/show.ejs', { appUser });
    });
});

// CREATE TWEET EMBEDDED IN USER
router.post('/:appUserId/tips', (req, res) => {
    console.log(req.body);
    // store new tweet in memory with data from request body
    const newTip = new Tip({ tipText: req.body.tipText });

    // find user in db by id and add new tweet
    AppUser.findById(req.params.appUserId, (error, appUser) => {
        appUser.tips.push(newTip);
        appUser.save((err, appUser) => {
            res.redirect(`/appusers/${appUser.id}`);
        });
    });
});

module.exports = router;
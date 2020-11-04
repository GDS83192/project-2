const router = require('express').Router();
const Tip = require('../models/tip.js');
const isAuthenticated = (req, res, next) => {
        if (req.session.currentUser) {
            return next()
        } else {
            res.redirect('/sessions/new')
        }
    }
    // NEW TIP FORM
router.get('/new', isAuthenticated, (req, res) => {
    res.render('tips/new.ejs', { currentUser: req.session.currentUser }, );
});

// CREATE A NEW TIP
router.post('/', async(req, res) => {
    try {
        let newTip = await Tip.create(req.body);

        res.redirect('/tips/new');
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
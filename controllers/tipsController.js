const router = require('express').Router();
const Tip = require('../models/tip.js');

// NEW TIP FORM
router.get('/new', (req, res) => {
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
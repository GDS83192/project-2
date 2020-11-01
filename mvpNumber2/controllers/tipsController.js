const router = require('express').Router();
const Tip = require('../models/tip.js');

// NEW TIP FORM
router.get('/new', (req, res) => {
    res.render('tips/new.ejs');
});

// CREATE A NEW TIP
router.post('/', async(req, res) => {
    try {
        let newTip = await Tip.create(req.body);
        res.redirect('/cares/');
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
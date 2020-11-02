const router = require('express').Router();
const Tip = require('../models/tip.js');
const Poster = require('../models/poster.js')

router.get('/', async(req, res) => {
    let tips = await Tip.find({});
    res.render('tips/index', { tips, currentUser: req.session.currentUser });
});

router.get('/new', (req, res) => {
    res.render('tips/new', { currentUser: req.session.currentUser });
});

router.post('/', async(req, res) => {
    let tip = await Tip.create(req.body);
    res.redirect('/tips');
});

module.exports = router;
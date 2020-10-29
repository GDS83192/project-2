const router = require('express').Router();
const Poster = require('../models/poster.js');
const Tip = require('../models/tip.js');


router.get('/', async(req, res) => {
    let posters = await Poster.find({});
    res.render('users/index', { users, currentUser: req.session.currentUser });
});

router.get('/new', async(req, res) => {
    let tips = await Tip.find();
    res.render('posters/new', { tips, currentUser: req.session.currentUser });
});

router.get('/:id', async(req, res) => {
    let poster = await Poster.findById(req.params.id).populate('posters');
    console.log(poster);
    res.render('posters/show', { poster, currentUser: req.session.currentUser });
});

router.post('/', async(req, res) => {
    let poster = await Poster.create(req.body);
    res.redirect(`/posters/${poster.id}`);
});

router.delete('/:id', async(req, res) => {
    await Poster.findByIdAndDelete(req.params.id);
    res.redirect('/posters');
});

module.exports = router;
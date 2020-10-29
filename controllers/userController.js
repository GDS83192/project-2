const router = require('express').Router();
const User = require('../models/user');
const Tip = require('../models/tip');

router.get('/', async(req, res) => {
    let allUsers = await User.find();
    res.render('users/index.ejs', { users: allUsers });
});

router.get('/new', async(req, res) => {
    let allTips = await Tip.find({});
    res.render('users/new.ejs', { tip: allTips });
});

router.get('/:id', async(req, res) => {
    let allTips = await Tip.find({});
    let foundUser = await User.findById(req.params.id).populate({
        path: 'tips',
        options: { sort: {
                ['name']: 1 } },
    });

    let tipsForChecklist = allTips.filter((tip) => {
        if (!foundUser.tips.map((user) => user.id).includes(tip.id)) {
            return tip;
        }
    });

    res.render('users/show.ejs', {
        user: foundUser,
        tips: tipsForChecklist,
    });
});

router.post('/', async(req, res) => {
    console.log(req.body);
    let user = await User.create(req.body);
    res.redirect(`/users/${user.id}`);
});

router.put('/:userId/tips', async(req, res) => {
    let foundUser = await User.findByIdAndUpdate(
        req.params.userId, {
            $push: {
                tips: req.body.tips,
            },
        }, { new: true, upsert: true }
    );
    console.log(foundUser);
    res.redirect(`/users/${foundUser.id}`);
});

module.exports = router;
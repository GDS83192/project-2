const router = require('express').Router();
const Care = require('../models/care');
const Tip = require('../models/tip');

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next();
    } else {
        res.redirect('/sessions/new');
    }
};

//1. INDEX ROUTE
router.get('/', isAuthenticated, async(req, res) => {
    let allCares = await Care.find()
    res.render('cares/index.ejs', { cares: allCares, currentUser: req.session.currentUser })
})

//2. NEW ROUTE
router.get('/new', isAuthenticated, async(req, res) => {
    let allTips = await Tip.find({});
    res.render('cares/new.ejs', { tips: allTips, currentUser: req.session.currentUser }, );
});



// 3. UPDATE ROUTE to Add New Tips to a Category after Creation
router.put('/:careId/tips', isAuthenticated, async(req, res) => {
    let foundCare = await Care.findByIdAndUpdate(
        req.params.careId, {
            $push: {
                tips: req.body.tips,

            },
        }, { new: true, upsert: true }
    );
    console.log(foundCare);
    res.redirect(`/cares/${foundCare.id}`);
});


//4. SHOW ROUTE FOR CATEGORIES
router.get('/:id', isAuthenticated, async(req, res) => {



    let allTips = await Tip.find({});
    let foundCare = await Care.findById(req.params.id).populate({
        path: 'tips',
        options: {
            sort: {
                ['name']: 1
            }
        },
    });

    res.render('cares/show.ejs', {
        care: foundCare,
        tips: allTips,
        currentUser: req.session.currentUser,

    }, );
});

//5. CATEGORY CREATE ROUTE
router.post('/', async(req, res) => {
    console.log(req.body);
    let care = await Care.create(req.body);
    res.redirect(`/cares/${care.id}`);
});


// 6. CATEGORY UPDATE ROUTE 
router.put('/:id', async(req, res) => {
    let foundCare = await Care.findByIdAndUpdate(
        req.params.id, {
            $set: {
                name: req.body.name,
                image: req.body.image,
            },
        }, { new: true, upsert: true }
    );
    console.log(foundCare);
    res.redirect(`/cares/`);
});

// 7. CATEGORY DELETE ROUTE
router.delete('/:id', (req, res) => {
    Care.findByIdAndRemove(req.params.id, (error) => {
        res.redirect('/cares');
    });
});



// 8. CATEGORY EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    Care.findById(req.params.id, (error, care) => {
        res.render('./cares/edit.ejs', { care, currentUser: req.session.currentUser }, );
    });
});

// 9. UPDATE ROUTE TO REMOVE TIPS FROM CATEGORY
router.put('/:careId/tips/remove', async(req, res) => {
    let foundCare = await Care.findByIdAndUpdate(
        req.params.careId, {
            $pullAll: {
                tips: req.body.tips,

            },
        }, { multi: true, new: true, upsert: true }
    );
    console.log(foundCare);
    res.redirect(`/cares/${foundCare.id}`);
});


module.exports = router;
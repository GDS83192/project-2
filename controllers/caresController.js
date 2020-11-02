const router = require('express').Router();
const Care = require('../models/care');
const Tip = require('../models/tip');



//1. INDEX ROUTE
router.get('/', async(req, res) => {
    let allCares = await Care.find()
    res.render('cares/index.ejs', { cares: allCares })
})

//2. NEW ROUTE
router.get('/new', async(req, res) => {
    let allTips = await Tip.find({});
    res.render('cares/new.ejs', { tips: allTips });
});



// 5. UPDATE ROUTE to Add New Tips to a User after Creation
router.put('/:careId/tips', async(req, res) => {
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


//3. SHOW ROUTE
router.get('/:id', async(req, res) => {
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
    });
});

//4. CREATE ROUTE
router.post('/', async(req, res) => {
    console.log(req.body);
    let care = await Care.create(req.body);
    res.redirect(`/cares/${care.id}`);
});










//Update Route for User (vs Tips)

// 5. UPDATE ROUTE
router.put('/:id', async(req, res) => {
    let foundCare = await Care.findByIdAndUpdate(
        req.params.id, {
            $set: {
                name: req.body.name,
            },
        }, { new: true, upsert: true }
    );
    console.log(foundCare);
    res.redirect(`/cares/`);
});

// 6. DELETE ROUTE
router.delete('/:id', (req, res) => {
    Care.findByIdAndRemove(req.params.id, (error) => {
        res.redirect('/cares');
    });
});



// EDIT
router.get('/:id/edit', (req, res) => {
    Care.findById(req.params.id, (error, care) => {
        res.render('./cares/edit.ejs', { care });
    });
});

// Route to Remove Tips
router.put('/:careId/tips/remove', async(req, res) => {
    let foundCare = await Care.findByIdAndUpdate(
        req.params.careId, {
            $pull: {
                tips: req.body.tips,

            },
        }, { new: true, upsert: true }
    );
    console.log(foundCare);
    res.redirect(`/cares/${foundCare.id}`);
});

// router.put("/:id", function(req, res) {
//     Care.findByIdAndUpdate(req.params.id,
//         req.params.name,
//         function(err, updatedCare) {
//             if (err) {
//                 console.log("ERROR!");
//             } else {
//                 res.redirect("/cares/" + req.params.id);
//             }
//         });
// });
module.exports = router;
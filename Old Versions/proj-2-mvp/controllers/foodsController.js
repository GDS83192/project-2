const router = require('express').Router();
const Food = require('../models/food');
const Ingredient = require('../models/ingredient');

router.get('/', (req, res) => {
  Food.find({})
    .populate('ingredients')
    .exec((err, foods) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.render('foods/index.ejs', { foods });
    });
});

router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

router.post('/', (req, res) => {
  Food.create(req.body, (error, food) => {
    res.send(food);
  });
});

router.post('/:foodId/ingredients', (req, res) => {
  console.log(req.body);
  const newIngredient = new Ingredient({
    name: req.body.name,
    origin: req.body.origin,
  });

  // find user in db by id and add new tweet
  Food.findById(req.params.foodId, (error, food) => {
    food.ingredients.push(newTweet);
    user.save((err, user) => {
      res.redirect(`/users/${user.id}`);
    });
  });
});

router.get('/:id', (req, res) => {
  Food.findById(req.params.id)
    .populate('ingredients')
    .exec((err, food) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.render('foods/show.ejs', { food });
    });
});

module.exports = router;

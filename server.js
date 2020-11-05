require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const mongoURI = "mongodb+srv://m001-student:Mongo8319@sandbox.vv1cz.mongodb.net/test?authSource=admin&replicaSet=atlas-kmo5lm-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

mongoose.connect(
    mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
        console.log('the connection with mongod is established');
    }
);

// MIDDLEWARE
app.use(
    session({
        secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
        resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
        saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
    })
);


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// ABOVE our app.get()

app.use('/users', require('./controllers/usersController'));

app.use('/sessions', require('./controllers/sessionsController'));
app.use('/tips', require('./controllers/tipsController'));
app.use('/cares', require('./controllers/caresController'));

app.get('/', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser });
});

app.get('/any', (req, res) => {
    //any route will work
    req.session.anyProperty = 'any value';
    console.log(req.session);
    res.send('session was added');
});

app.get('/retrieve', (req, res) => {
    //any route will work
    console.log(req.session);
    if (req.session.anyProperty === 'something you want it to') {
        //test to see if that value exists
        //do something if it's a match
        console.log('it matches! cool');
    } else {
        //do something else if it's not
        console.log('nope, not a match');
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
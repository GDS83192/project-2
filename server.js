require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;

const mongoURI = "mongodb+srv://m001-student:Mongo8319@sandbox.vv1cz.mongodb.net/test?authSource=admin&replicaSet=atlas-kmo5lm-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

mongoose.connect(
    mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
        console.log('the connection with mongod is established');
    }
);

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// ABOVE our app.get()

app.use('/tips', require('./controllers/tipsController'));
app.use('/cares', require('./controllers/caresController'));
app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
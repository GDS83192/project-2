const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipSchema = new Schema({
    tipText: {
        type: String,
        default: '',
    },
}, { timestamps: true });

const appUserSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    tips: [tipSchema],
}, { timestamps: true });

const AppUser = mongoose.model('AppUser', appUserSchema);
const Tip = mongoose.model('Tip', tipSchema);

module.exports = { AppUser, Tip };
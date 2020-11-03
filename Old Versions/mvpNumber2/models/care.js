const mongoose = require('mongoose');

const careSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    tips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tip',
    }, ],
}, { timestamps: true });

module.exports = mongoose.model('Care', careSchema);
const mongoose = require('mongoose');

const careSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    image: {
        type: String,
    },
    tips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tip',
    }, ],
}, { timestamps: true });

module.exports = mongoose.model('Care', careSchema);
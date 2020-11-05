const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        unique: true,
    },
    description: {
        type: String,
        default: '',
    },

    tipImg: {
        type: String,
        default: '',
    }
}, {
    timestamps: true,
    collation: { locale: 'en', strength: 2 }
});

module.exports = mongoose.model('Tip', tipSchema);
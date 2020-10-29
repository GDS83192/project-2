const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Tip', tipSchema);
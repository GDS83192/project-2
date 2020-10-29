const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
    tips: [{
        type: Schema.Types.ObjectId,
        ref: 'Tip',
    }, ],
});

module.exports = mongoose.model('User', userSchema);
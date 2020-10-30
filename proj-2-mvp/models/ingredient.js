const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    default: '',
  },
  origin: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);

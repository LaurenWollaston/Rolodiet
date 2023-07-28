const { model, Schema } = require('mongoose');

const recipeSchema = new Schema({
    uri: String,
    cuisineType: [String],
    dietLabels: [String],
    healthLabels: [String],
    ingredientLines: [String],
    calories: Number,
    image: String,
    url: String
});

module.exports = model('Recipe', recipeSchema);
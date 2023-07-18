// name of dish (string, required), ingredients (array, required), 
// recipe (string, req), author (string, req)

const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ingredients: [
        {
            type: String,
            required: true,
        }
    ],
    recipe: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe
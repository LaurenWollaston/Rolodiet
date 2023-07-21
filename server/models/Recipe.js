// name of dish (string, required), ingredients (array, required), 
// recipe (string, req), authors (string, req)

const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    title: {
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
    description: {
        type: String,
        required: true,
    },
    authors: [
        {
            type: String,
        },
    ],
    image: {
        type: String,
    },
    link: {
        type: String,
    }
    
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe
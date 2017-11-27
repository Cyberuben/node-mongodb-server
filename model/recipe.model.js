const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    imagePath: String,
    time: String,
    ingredients: [{
        name: String,
        amount: Number
    }]
}, {
    timestamps: true
});


const Recipe = mongoose.model('Recipe', RecipeSchema);

// Add a 'dummy' Recipe (every time you require this file!)
const Recipe = new Recipe({
    name: 'Tomato soup',
    description: 'Tomato soup is a soup made with tomatoes as the primary ingredient.',
}).save();

module.exports = Recipe;
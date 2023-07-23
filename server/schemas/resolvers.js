const fetch = require('node-fetch');
const { User } = require('../models');
const signToken = require('../utils/auth');

const resolvers = {
    Query: {
        // Query single user by id or username
        user: async (_, { id, username }) => {
            return User.findOne({
                $or: [{ _id: id }, { username }],
            });
        },

        me: async (_, __, context) => {
            if (context.user) {
                return User.findById(context.user._id);
            }
            throw new Error('You are not logged in!')
        },

        // Resolver to fetch a list of recipes based on a search term
        searchRecipes: async (_, { searchTerm }) => {
            const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`);
            const data = await response.json();

            // Map the data to adapt to our defined schema
            return data.hits.map(({ recipe }) => ({
                recipeId: recipe.uri,
                cuisine: recipe.cuisineType,
                authors: recipe.source,
                description: recipe.label,
                ingredients: recipe.ingredientLines,
                instructions: recipe.instructions,
                title: recipe.label,
                image: recipe.image,
                link: recipe.url
            }));
        },
    },
    Mutation: {
        // Create new user with signed webtoken and send to client
        createUser: async (_, { input }) => {
            const user = await User.create({ ...input, savedRecipes: [] });

            if(!user) {
                throw new Error('Something went wrong!');
            }

            const token = signToken(user);

            return { token, user };
        },

        // Login user with email and password and send token to client
        login: async (_, { input }) => {
            const user = await User.findOne({ $or: [{ username: input.username }, { email: input.email }] });

            if(!user) {
                throw new Error('Incorrect username or password');
            }

            const correctPassword = await user.isCorrectPassword(input.password);

            if(!correctPassword) {
                throw new Error('Incorrect username or password')
            }
            
            const token = signToken(user);

            return { token, user };
        },

        // Save recipe to user's 'savedRecipes' field by adding it to the set (preventing duplicates)
        saveRecipe: async (_, { userId, recipe }) => {
            const updatedUser = await User.fineOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedRecipes: recipe } },
                { new: true, runValidators: true}
            );

            if(!updatedUser) {
                throw new Error('Could not save recipe!');
            }

            return { updatedUser };
        },

        // Remove recipe from user's 'savedRecipes' field by removing it from the set
        removeRecipe: async (_, { userId, recipeId }) => {
            const updatedUser = await User.fineOneAndUpdate(
                { _id: userId },
                { $pull: {savedRecipes: { recipeId } } },
                { new: true }
            );

            if(!updatedUser) {
                throw new Error('Could not remove recipe!');
            }

            return { updatedUser };
        },
    },
};

module.exports = resolvers;
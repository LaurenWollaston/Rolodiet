const { User, Recipe } = require('../models');
const signToken = require('../utils/auth');

const resolvers = {
    Query: {
        // Query single user by id or username
        user: async (_, { id, username }) => {
            return User.findOne({
                $or: [{ _id: id }, { username }],
            });
        },
        findAllRecipes: async () => {
            try {
              // Fetch all recipes from the database
              const recipes = await Recipe.find();
              return recipes;
            } catch (error) {
              console.error('Error fetching recipes:', error);
              throw new Error('Failed to fetch recipes.');
            }
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
            const updatedUser = await user.fineOneAndUpdate(
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
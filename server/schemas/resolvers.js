const { User, Recipe } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Fetch single user by id or username
        user: async (_, { id, username }) => {
            return User.findOne({
                $or: [{ _id: id }, { username }],
            });
        },

        // Fetch logged-in user's data
        me: async (_, __, context ) => {
            if (!context.user) {
                throw new Error('Not authenticated')
            }
            // Find user in database if context.user is defined
            return await User.findOne({ _id: context.user._id });
        },

        findAllRecipes: async (_, { page, perPage }) => {
            try {
                const startIndex = (page - 1) * perPage;
                const endIndex = startIndex + perPage;

                console.log('Fetching recipes from index:', startIndex, 'to', endIndex);

                const recipes = await Recipe.find().skip(startIndex).limit(perPage);

                return recipes;
            } catch (error) {
                console.error('Error fetching recipes:', error);
                throw new Error('Failed to fetch recipes.');
            }
        },
        autocompleteRecipes: async (_, { searchTerm }) => {
            try {
                // Find matches in database for submission
                const recipes = await Recipe.find({
                    title: { $regex: new RegExp(`.*${searchTerm}.*`, "i") },
                }).limit(5); // Limit 5 results so we can reuse the print to cards thing.

                return recipes;
            } catch (error) {
                console.error("Error fetching autocomplete recipes:", error);
                throw new Error("Failed to fetch autocomplete recipes.");
            }
        },

    },
    Mutation: {
        // Create new user with signed webtoken and send to client
        createUser: async (_, { input }) => {
            // Check if user data exists before creating user with input username and email
            const user = await User.findOne({ $of: [{ username: input.username }, { email: input.email }] });

            if (user) {
                throw new Error('User already exists!');
            }

            const newUser = await User.create(input);

            const token = signToken(newUser);

            return { token, user: newUser };
        },

        // Login user with email and password and send token to client
        login: async (_, { input }) => {
            const user = await User.findOne({ $or: [{ username: input.username }, { email: input.email }] });

            if (!user) {
                throw new Error('Incorrect username or password');
            }

            const correctPassword = await user.isCorrectPassword(input.password);

            if (!correctPassword) {
                throw new Error('Incorrect username or password')
            }

            const token = signToken(user);

            return { token, user };
        },

        // Save recipe to user's 'savedRecipes' field by adding it to the set (preventing duplicates)
        saveRecipe: async (_, { userId, recipe }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedRecipes: recipe } },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                throw new Error('Could not save recipe!');
            }

            // Schema expecting User object as per mutation defined in typeDefs
            return updatedUser;
        },

        // Remove recipe from user's 'savedRecipes' field by removing it from the set
        removeRecipe: async (_, { userId, recipeId }) => {
            const updatedUser = await User.fineOneAndUpdate(
                { _id: userId },
                { $pull: { savedRecipes: { recipeId } } },
                { new: true }
            );

            if (!updatedUser) {
                throw new Error('Could not remove recipe!');
            }
            // Schema expecting User object as per mutation defined in typeDefs
            return updatedUser;
        },
    },
};

module.exports = resolvers;
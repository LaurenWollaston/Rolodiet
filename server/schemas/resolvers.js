const fetch = require('node-fetch');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { ApolloError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    Query: {
        recipe: async (_, { term, limit }) => {

            const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${term}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`);

            const data = await response.json();

            if (!data.hits || !Array.isArray(data.hits)) {
                throw new Error("No recipes found");
            }

            // Apply a limit of 5 recipes
            const limitedRecipes = data.hits.slice(0, limit);

            // Map the data to adapt to our defined schema
            const recipesToSave = limitedRecipes.map(({ recipe }) => ({
                uri: recipe.uri,
                cuisineType: recipe.cuisineType,
                dietLabels: recipe.dietLabels,
                healthLabels: recipe.healthLabels,
                ingredientLines: recipe.ingredientLines,
                calories: recipe.calories,
                image: recipe.image,
                url: recipe.url
            }));

            await Recipe.insertMany(recipesToSave);

            return recipesToSave;
        },

        user: async (_, { id }) => User.findById(id),

    },
    Mutation: {
        registerUser: async (_, { registerInput: { username, email, password } }) => {

            // Check if user already exists with that email
            const oldUser = await User.findOne({ email });

            // If user exists, throw an error
            if (oldUser) {
                throw new ApolloError('User already exists with that email');
            }


            // Encrypt the password
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Build the mongoose user object
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });

            // Create JWT (attach to user object)
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "secret_is_out",
                {
                    expiresIn: "2h",
                }
            );

            newUser.token = token;

            // Save the user to the database
            const res = await newUser.save();

            return {
                id: res.id,
                ...res._doc,
            }
        },

        loginUser: async (_, { loginInput: { email, password } }) => {

            // Check if user exists with that email
            const user = await User.findOne({ email });

            // If user doesn't exist, throw an error
            if (user && (await bcrypt.compare(password, user.password))) {
                // Create JWT (attach to user object)
                const token = jwt.sign(
                    { user_id: user._id, email },
                    "secret_is_out",
                    {
                        expiresIn: "2h",
                    }
                );
                user.token = token;

                return {
                    id: user.id,
                    ...user._doc,
                }
            } else {
                // If user exists, but password is incorrect, throw an error
                throw new ApolloError('Invalid password');
            }
        },
    },
};

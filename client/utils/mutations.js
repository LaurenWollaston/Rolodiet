import { gql } from '@apollo/client';

// Mutations for login, create user, save and remove recipes
export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_RECIPE = gql`
    mutation saveRecipe($recipeData: SaveRecipeInput!) {
        saveRecipe(recipeData: $recipeData) {
            _id
            username
            email
            savedRecipes {
                recipeId
                cusine
                authors
                description
                ingredients
                title
                image
                link
            }
        }
    }
`;

export const REMOVE_RECIPE = gql`
    mutation removeRecipe($recipeId: ID!) {
        removeRecipe(recipeId: $recipeId) {
            savedRecipes {
                recipeId
                cusine
                authors
                description
                ingredients
                title
                image
                link
            }
        }
    }
`;

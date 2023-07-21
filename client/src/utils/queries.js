import { gql } from '@apollo/client';

// Query to fetch logged-in users and their saved recipes
export const QUERY_ME = gql`
    query me {
        _id
        username
        email
        recipeCount
        savedRecipes{
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
`;

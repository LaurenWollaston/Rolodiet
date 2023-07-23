// Update the typeDefs to include the pagination arguments for findAllRecipes
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    user(_id: ID, username: String): User!
    recipes(term: String!): [Hit!]!
}
  type User {
    _id: ID!
    name: String!
    email: String!
    recipeCount: Int
    savedRecipes: [Recipe]
  }

  type Hit {
    recipe: Recipe
  }

  type Recipe {
    uri: String!
    cuisineType: [String]!
    dietLabels: [String]
    healthLabels: [String]
    ingredientLines: [String]!
    calories: Float!
    ingredients: [Ingredient]!
    image: String
    url: String
  }

  type Ingredient {
    text: String
    quantity: Float
    measure: String
    food: String
    weight: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  input LoginInput {
    email: String!
    username: String!
    password: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input SaveRecipeInput {
    recipeId: String!
    uri: String!
    cuisineType: [String]!
    dietLabels: [String]
    healthLabels: [String]
    ingredientLines: [String]!
    calories: Float!
    ingredients: [Ingredient]!
    image: String
    url: String
  }


  type Mutation {
    login(input: LoginInput!): Auth
    createUser(input: CreateUserInput!): Auth
    saveRecipe(userId: ID!, recipe: SaveRecipeInput!): User
    removeRecipe(userId: ID!, recipeId: String!): User
  }
`;

module.exports = typeDefs;

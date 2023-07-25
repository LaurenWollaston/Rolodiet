// Update the typeDefs to include the pagination arguments for findAllRecipes
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    recipeCount: Int
    savedRecipes: [Recipe]
  }

  type Recipe {
    _id: ID!
    cuisine: String!
    authors: [String]
    description: String!
    ingredients: [String]
    title: String!
    image: String
    link: String
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
    authors: [String]
    cusine: String!
    description: String!
    ingredients: String!
    title: String!
    image: String
    link: String
  }

  type Query {
    me: User
    user(_id: ID, name: String): User!
    findAllRecipes(page: Int, perPage: Int): [Recipe!]!
    autocompleteRecipes(searchTerm: String): [Recipe!]!
  }

  type Mutation {
    login(input: LoginInput!): Auth
    createUser(input: CreateUserInput!): Auth
    saveRecipe(userId: ID!, recipe: SaveRecipeInput!): User
    removeRecipe(userId: ID!, recipeId: String!): User
  }
`;

module.exports = typeDefs;

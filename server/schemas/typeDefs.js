const { gql } = require('apollo-server-express');

module.exports = gql`

  type Recipe {
    uri: String!
    cuisineType: [String]
    dietLabels: [String]
    healthLabels: [String]
    ingredientLines: [String]!
    calories: Float!
    image: String
    url: String
}

type User {
    username: String!
    email: String!
    password: String!
    token: String!
}

input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
}

input LoginInput {
    email: String!
    password: String!
}

type Query {
    recipe(term: String!): [Recipe!]!
    user(id: ID!): User!
}

type Mutation {
    registerUser(registerInput: RegisterInput): User!
    loginUser(loginInput: LoginInput): User!
}
`;

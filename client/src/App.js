import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Navbar from "./components/Navbar";
import './App.css';
import MainPage from './components/MainPage';
import Features from './components/Features';
import About from './components/About';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

// Create an instance of Apollo Client
const client = new ApolloClient({
  uri: 'https://good-eats-b2abe2613d0c.herokuapp.com/graphql', // Replace this with your GraphQL server endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignupForm />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

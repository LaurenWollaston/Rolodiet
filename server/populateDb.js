const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Adjust the path if needed

// Replace the following with the path to your JSON file
const jsonFilePath = './recipes.json';

// Function to populate the database with data from the JSON file
const populateDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/good-eats', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Read the JSON file
    const jsonData = require(jsonFilePath);

    // Check if the database is already populated
    const recipeCount = await Recipe.countDocuments();
    if (recipeCount > 0) {
      console.log('Database is already populated. Exiting...');
      return;
    }

    // Insert data into the database
    await Recipe.insertMany(jsonData);

    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating the database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Call the populateDatabase function to start populating the database
populateDatabase();

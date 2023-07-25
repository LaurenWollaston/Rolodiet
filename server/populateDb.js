const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Adjust the path if needed

// Replace the following with the path to your JSON file
const jsonFilePath = './recipes.json';
const Epithymia = './seeds/Epithymia.json';
const Errinnys = './seeds/Errinnys.json';
const Kakia = './seeds/Kakia.json';
const Phthonos = './seeds/Phthonos.json';
const Zelos = './seeds/Zelos.json';

// Function to insert data into the database
const insertData = async (data) => {
  // Check if the 'description' field is missing or empty
  if (!data.description || data.description.trim() === '') {
    console.warn('Skipping document without description:', data.title);
    return;
  }

  try {
    await Recipe.create(data);
  } catch (error) {
    console.error('Error inserting document:', error);
  }
};

// Function to populate the database with data from the JSON file
const populateDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/good-eats', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Read the JSON files with error handling
    const jsonData = require(jsonFilePath);
    const EpithymiaData = require(Epithymia);
    const ErrinnysData = require(Errinnys);
    const KakiaData = require(Kakia);
    const PhthonosData = require(Phthonos);
    const ZelosData = require(Zelos);

    // Check if the database is already populated
    const recipeCount = await Recipe.countDocuments();
    if (recipeCount > 0) {
      console.log('Database is already populated. Exiting...');
      mongoose.connection.close();
      return;
    }

    // Insert data into the database
    for (const data of jsonData) {
      await insertData(data);
    }

    for (const data of EpithymiaData) {
      await insertData(data);
    }

    for (const data of ErrinnysData) {
      await insertData(data);
    }

    for (const data of KakiaData) {
      await insertData(data);
    }

    for (const data of PhthonosData) {
      await insertData(data);
    }

    for (const data of ZelosData) {
      await insertData(data);
    }

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

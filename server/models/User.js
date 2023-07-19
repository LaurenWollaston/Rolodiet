const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const Recipe = require('./Recipe');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },

    // set savedRecipes to be an array of data that adheres to recipeSchema
    savedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
      }
    ],
  },
  // Use the virtual defined below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create hashed password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when user is queried, a field called 'recipeCount' with the number of saved recipies will be returned with the query
userSchema.virtual('recipeCount').get(
  function () {
    return this.savedRecipes.length;
  }
);

const User = model('User', userSchema);

module.exports = User;

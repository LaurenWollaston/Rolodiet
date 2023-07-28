const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 4 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 5 },
    token: { type: String, required: true, unique: true, trim: true }
});

module.exports = model('User', userSchema);

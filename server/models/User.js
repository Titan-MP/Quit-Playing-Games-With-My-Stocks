const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = model('User', userSchema);

module.exports = User;

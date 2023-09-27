const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    primaryKey: true,
  },
  password:{
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  stocks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Stock'
    }
  ],
});

const User = model('User', userSchema);

module.exports = User;

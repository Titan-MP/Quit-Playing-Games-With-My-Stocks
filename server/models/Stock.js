const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const Stock = new Schema({
  stockname: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  price: Number,
  priceChanged: Number,
});

module.exports = Stock;
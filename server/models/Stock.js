const { Schema } = require('mongoose');


const Stock = new Schema({
  stockname: {
    type: String,
    required: true,
  },
  price: Number,
  priceChanged: Number,
});

module.exports = Stock;
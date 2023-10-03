const { Schema, model } = require("mongoose");

const stockSchema = new Schema({
	symbol: {
		type: String,
		required: true,
		unique: true,
		primaryKey: true
	},
	name: {
		type: String,
		required: true
	}
});

const Stock = model("Stock", stockSchema);

module.exports = Stock;

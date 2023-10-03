const { Schema, model } = require("mongoose");

const positionSchema = new Schema({
	stock: {
		type: Schema.Types.ObjectId,
		ref: "Stock"
	},
	price: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
});

const Position = model("Position", positionSchema);

module.exports = Position;

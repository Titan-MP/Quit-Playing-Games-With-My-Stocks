const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		primaryKey: true
	},
	password: {
		type: String,
		required: true
	},
	initialFunding: {
		type: Number,
		required: true
	},
	netLiquidation: {
		type: Number,
		required: false
	},
	positions: [
		{
			type: Schema.Types.ObjectId,
			ref: "Position"
		}
	],
	watchlists: [
		{
			type: Schema.Types.ObjectId,
			ref: "Watchlist"
		}
	]
});

userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;

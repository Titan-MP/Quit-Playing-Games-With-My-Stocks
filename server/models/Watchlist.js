const { Schema, model } = require('mongoose');

const watchlistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    stocks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Stock'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Watchlist = model('Watchlist', watchlistSchema);

module.exports = Watchlist;

const { Schema, model } = require('mongoose');

const watchlistSchema = new Schema({
    stocks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Stock'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Watchlist = model('Watchlist', watchlistSchema);

module.exports = Watchlist;

const { Position, Stock, User, Watchlist } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        positions: async () => {
            return Position.find();
        },
        position: async (parent, { _id }) => {
            return Position.findOne({ _id });
        },
        stocks: async () => {
            return Stock.find();
        },
        stock: async (parent, { _id }) => {
            return Stock.findOne({ _id });
        },
        users: async () => {
            return User.find();
        },
        user: async (parent, { username }) => {
            return User.findOne({ username });
        },
        watchlists: async () => {
            return Watchlist.find();
        },
        watchlist: async (parent, { _id }) => {
            return Watchlist.findOne({ _id });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addPosition: async (parent, args) => {
            const position = await Position.create(args);
            return position;
        },
        addStock: async (parent, args) => {
            const stock = await Stock.create(args);
            return stock;
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        addWatchlist: async (parent, args) => {
            const watchlist = await Watchlist.create(args);
            return watchlist;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Invalid email or password!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Invalid email or password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        addStockToWatchlist: async (parent, { watchlistId, stockId }) => {
            return Watchlist.findOneAndUpdate(
                { _id: watchlistId },
                {
                    $addToSet: { stocks: stockId },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeStockFromWatchlist: async (parent, { watchlistId, stockId }) => {
            return Watchlist.findOneAndUpdate(
                { _id: watchlistId },
                {
                    $pull: { stocks: stockId },
                },
                {
                    new: true,
                }
            );
        },
    },
};

module.exports = resolvers;

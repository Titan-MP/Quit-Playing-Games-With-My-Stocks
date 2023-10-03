const { User, Stock } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.findOne(params).populate('stocks'); //change find to findOne
    },
    stock: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Stock.findOne(params); //change find to findOne
    },

//add me Query
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('stocks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (parent, { username, password, amount }) => {
      const user = await User.create({ username, password, amount });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user found with this address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addStock: async (parent, { symbol, name, price, quantity }, context) => {
      if (symbol && name && price && quantity) {
        const stock = await Stock.create({
          symbol, name, price, quantity
        });

        return stock;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeStock: async (parent, { stockId }, context) => {
      if (stockId) {
        const stock = await stock.findOneAndDelete({_id: stockId});

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { stocks: stock._id } }
        );

        return stock;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeUser: async (parent, { userId }, context) => {
      if (userId) {
        const user = await user.findOneAndDelete({_id: userId});
        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
};

module.exports = resolvers;

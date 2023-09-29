const { User, Stock } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { _id }) => {
      return await User.findOne({ _id });
    },
    // stock: async () => {
    //   return Stock.find().populate('User');
    // },
    // stock: async (parent, { _id }) => {
    //   return Stock.findOne({ _id }).populate('User');
    // },
  },
  Mutation: {
    addUser: async (parent, { username, password}) => {
      const user = await User.create({ username, password});
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, {username, password }) => {
      const user = await User.findOne({ username});
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },


    addStock: async (parent, {symbol, name, price, quantity}) => {
      const stock = await Stock.create({ symbol, name, price, quantity });
      return stock ;
    },

    updateStock: async (parent, {_id, quantity}) => {
      const stock = await Stock.findOneAndUpdate (
       {_id: _id},
       {
        $addToSet: { quantity: quantity},
       },
       {
        new: true,
        runValidators: true,
       }
      );
    },

    updateAmount: async (parent, {_id, amount}) => {
      const user = await User.findOneAndUpdate (
        {_id: _id},
        {
          $addToSet: {amount: amount},
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeStock: async (parent, {_id} ) => {
      const stock = await Stock.findOneAndDelete ({
        _id: _id
      });
    },

    removeUser: async (parent, {_id}) => {
      const user = await User.findOneAndDelete ({
        _id: _id
      });
    },
  },
};

module.exports = resolvers;

const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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

    addStock: async (parent, { userId, stockname, price, priceChanged }) => {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { stockDatas: {stockname, price, priceChanged} },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },

    saveStock: async (parent, {stockId, price}) => {
      return User.findOneAndUpdate(
        {_id: stockId},
        {
          $addToSet: {price: price}
        },
        {
          new: true,
          runValidators: true,
        }
      )
    },

    removeStock: async (parent, { userId, stockId}) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { stockDatas: { _id: stockId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

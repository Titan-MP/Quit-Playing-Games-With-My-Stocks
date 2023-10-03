import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      amount
      stocks {
        _id
        symbol
        name
        price
        quantity
      }
    }
  }
`;

export const QUERY_ME = gql`
{
    me {
      _id
      username
      amount
      stocks {
        _id
        symbol
        name
        price
        quantity
      }
    }
  }
`;

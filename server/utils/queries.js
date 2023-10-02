import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      amount
      stocks
    }
}
`;

export const QUERY_USERS = gql`
query Users {
  users {
    _id
   user
   stocks
      _id
    }
  }
}
`;

export const QUERY_STOCKS = gql`
  query posts {
    posts {
      _id
      symbol
     quantity
      price
      user {
        _id
      }
    }
  }
`;
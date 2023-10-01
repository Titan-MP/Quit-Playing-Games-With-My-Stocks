import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
        password
        _id
      }
    }
  }
`;

// Create a new user
export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $amount: Int!) {
        addUser(username: $username, password: $password, amount: $amount) {
            user {
                _id
                username
            }
        }
    }
`;

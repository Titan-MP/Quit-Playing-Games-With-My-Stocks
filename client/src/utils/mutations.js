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

export const ADD_USER = gql`
    mutation addUser ($username: String!, $password: String! ) {
        addUser (username: $username, password: $password) {
            user {
                _id
                username
            }
        }
    }
`;
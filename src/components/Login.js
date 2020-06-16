import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AUTH_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const Login = props => {
  
  const [state, setState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  })

   const saveUserData = (token) => {
     localStorage.setItem(AUTH_TOKEN, token);
   };

  const confirm = async data => {
    const { token } = data;
    saveUserData(token);
    props.history.push('/');
  };

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      confirm(login);
    }
  });

  const [signupMutation] = useMutation(SIGNUP_MUTATION, {
    onCompleted({ signup }) {
      confirm(signup);
    },
  });

  const { login, email, password, name } = state;

  const handleClick = () => {
    if (login) {
      loginMutation({
        variables: {
          email,
          password,
          name
        }
      })
    } else {
      signupMutation({
        variables: {
          email,
          password,
          name,
        },
      });
    }
  }

  return (
    <div>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            value={name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <div className="pointer mr2 button" onClick={handleClick}>
          {login ? "login" : "create account"}
        </div>
        <div
          className="pointer button"
          onClick={() => setState({ ...state, login: !login })}
        >
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
}
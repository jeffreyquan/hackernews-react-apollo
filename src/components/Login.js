import React, { useState } from "react";
import { AUTH_TOKEN } from "../constants";

export const Login = () => {
  
  const [state, setState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  })

  const confirm = async () => {

  }

  const saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  };

  const { login, email, password, name } = state;

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
        <div className="pointer mr2 button" onClick={() => confirm()}>
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
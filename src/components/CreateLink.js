import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const ADD_POST = gql`
  mutation AddPost($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

export const CreateLink = (props) => {
  const [addPost, { data }] = useMutation(ADD_POST, {
    onCompleted: 
      () => props.history.push("/")
  });
  const [state, setState] = useState({
    description: '',
    url: ''
  });

  const handleClick = (e) => {
    addPost({
      variables: {
        description: state.description,
        url: state.url
      }
    })

    setState({
      description: '',
      url: ''
    })
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <input 
          className="mb2"
          value={state.description}
          onChange={e => setState({
            ...state,
            description: e.target.value
          })}
          type="text"
          placeholder="A description for the link"
        />
        <input 
          className="mb2"
          value={state.url}
          onChange={e => setState({
            ...state,
            url: e.target.value
          })}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}
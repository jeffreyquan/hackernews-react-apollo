import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { GET_FEED } from "./LinkList";
import { LINKS_PER_PAGE } from "../constants";

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
  const [addPost] = useMutation(ADD_POST, {
    onCompleted: 
      () => props.history.push("/new/1"),
    update: (store, { data: { post }}) => {
       const first = LINKS_PER_PAGE;
       const skip = 0;
       const orderBy = "createdAt_DESC";
       const data = store.readQuery({
         query: GET_FEED,
         variables: { first, skip, orderBy },
       });
       data.feed.links.unshift(post);
       store.writeQuery({
         query: GET_FEED,
         data,
         variables: { first, skip, orderBy },
       });
    }
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
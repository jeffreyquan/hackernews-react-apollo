import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";

const authToken = localStorage.getItem(AUTH_TOKEN);

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export const Link = ({ index, link, updateStoreAfterVote }) => {

  const [voteMutation] = useMutation(VOTE_MUTATION, {
    update: (store, { data: { vote } }) => updateStoreAfterVote(store, vote, link.id)
  });

  const voteForLink = () => {
    voteMutation({
      variables: {
        linkId: link.id
      }
    })
  }
    
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div className="ml1 gray f11" onClick={voteForLink}>
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes | by{" "}
          {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
}
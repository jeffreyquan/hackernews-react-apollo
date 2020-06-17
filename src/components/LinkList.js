import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "./Link";

export const GET_FEED = gql`
  query GetFeed {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export const LinkList = () => {

  const { loading, error, data } = useQuery(GET_FEED);

  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error</div>;

  const updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: GET_FEED });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: GET_FEED, data });
  }

  return (
    <div>
      {data.feed.links.map((link, index) => (
        <Link
          key={link.id}
          link={link}
          index={index}
          updateStoreAfterVote={updateCacheAfterVote}
        />
      ))}
    </div>
  );
}
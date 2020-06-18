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

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
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
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
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
      user {
        id
      }
    }
  }
`;

const subscribeToNewVotes = subscribeToMore => {
  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION
  })
};

const subscribeToNewLinks = (subscribeToMore) => {
  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });
};

export const LinkList = () => {

  const { loading, error, data, subscribeToMore } = useQuery(GET_FEED);

  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error</div>;

  const updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: GET_FEED });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: GET_FEED, data });
  }

  subscribeToNewLinks(subscribeToMore);

  subscribeToNewVotes(subscribeToMore);

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
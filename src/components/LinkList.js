import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "./Link";

const GET_FEED = gql`
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

  return (
    <div>
      {data.feed.links.map((link, index) => <Link key={link.id} link={link}  index={index} />)}
    </div> 
  );
}
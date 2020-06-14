import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "./Link";

const GET_FEED = gql`
  query GetFeed {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export const LinkedList = () => {

  const { loading, error, data } = useQuery(GET_FEED);

  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      {data.feed.links.map(link => <Link key={link.id} link={link} />)}
    </div> 
  );
}
import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "./Link";

const FEED_QUERY = gql`
  {
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

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        const linkstoRender = data.feed.links;

        return (
          <div>
            {linkstoRender.map(link => <Link key={link.id} link={link} />)}
          </div>
        )
      }}
    </Query>
  );
}
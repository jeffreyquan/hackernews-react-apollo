import React from "react";

export const Link = ({ link }) => {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  )
}
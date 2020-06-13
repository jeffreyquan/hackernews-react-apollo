import React from "react";

export const Link = () => {
  return (
    <div>
      <div>
        {this.props.link.description} ({this.props.link.url})
      </div>
    </div>
  )
}
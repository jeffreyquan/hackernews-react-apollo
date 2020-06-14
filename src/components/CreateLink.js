import React, { useState } from "react";

export const CreateLink = () => {
  const [state, setState] = useState({
    description: '',
    url: ''
  })

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
      <button>Submit</button>
    </div>
  )
}
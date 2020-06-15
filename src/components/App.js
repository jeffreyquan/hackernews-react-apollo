import React from 'react';
import { Switch, Route } from "react-router-dom";
import '../styles/App.css';
import { CreateLink } from "./CreateLink";
import { LinkList } from "./LinkList";
import Header from "./Header";

function App() {
  return (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path="/" component={LinkList} />
        <Route exact path="/create" component={CreateLink} />
      </Switch>
    </div>
  </div>
  )
}

export default App;

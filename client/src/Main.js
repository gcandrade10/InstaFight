import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import App from "./App";
import History from "./History";
import Top from "./Top";

class Main extends Component {
  render() {
    return (
		
      <main>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/history' component={History}/>
      <Route path='/viewtop' component={Top}/>
      {
        /*

        */
      }
    </Switch>
  </main>
    );
  }
}

export default Main;

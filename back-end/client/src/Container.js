import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";

class Container extends Component {
  render() {
    return (
		
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default Container;

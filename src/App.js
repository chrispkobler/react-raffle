import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import raffle from "./raffle";

class App extends Component {
  state = {
    manager: ""
  };

  async componentDidMount() {
    const manager = await raffle.methods.manager().call();

    this.setState({ manager });
  }

  render() {
    return (
      <div>
        <h2>Raffle Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }
}

export default App;

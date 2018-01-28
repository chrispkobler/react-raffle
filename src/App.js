import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import raffle from "./raffle";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  async componentDidMount() {
    const manager = await raffle.methods.manager().call();
    const players = await raffle.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(raffle.options.address);

    await this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    await raffle.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({ message: "You have been entered!" });
  };

  render() {
    return (
      <div>
        <h2>Raffle Contract</h2>
        <p>
          This contract is managed by {this.state.manager}
          There are currently {this.state.players.length} entered competing to
          win {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;

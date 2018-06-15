import React, { Component } from "react";
import "./Counter.css";
import CounterItem from "./../../components/CounterItem/CounterItem";

class Counter extends Component {
  render() {
    return (
      <div className="Counter">
        <header className="Counter-header">
          <p>To get started</p>
        </header>
        <main className="Counter-items">
          <CounterItem />
          <CounterItem />
          <CounterItem />
          <CounterItem />
        </main>
      </div>
    );
  }
}

export default Counter;

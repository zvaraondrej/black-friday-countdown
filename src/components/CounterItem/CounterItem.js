import React from "react";
import "./CounterItem.css";

const CounterItem = props => {
  return (
    <div className="CounterItem">
      <div className="CounterItem-value">{props.value}</div>
      <div className="CounterItem-desc">{props.desc}</div>
    </div>
  );
};

export default CounterItem;

import React from "react";
import ReactDOM from "react-dom";
import CounterItem from "./CounterItem";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CounterItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});

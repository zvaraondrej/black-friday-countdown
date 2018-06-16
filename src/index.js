import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Counter from "./containers/Counter/Counter";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Counter langId="de-AT" />, document.getElementById("root"));
registerServiceWorker();

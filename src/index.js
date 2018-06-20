import React from "react";
import ReactDOM from "react-dom";

import "./theme/globalStyle";
import registerServiceWorker from "./registerServiceWorker";

import Counter from "./Counter/Counter";

ReactDOM.render(<Counter langId="de-AT" />, document.getElementById("root"));
registerServiceWorker();

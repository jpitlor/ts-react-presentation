import React from "react";
import ReactDOM from "react-dom"

import Store from "./Store";
import App from "./App";

import "./app.css";

ReactDOM.render(
	<Store>
		<App />
	</Store>, 
	document.getElementById("app")
);
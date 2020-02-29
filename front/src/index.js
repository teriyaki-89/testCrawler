import "babel-polyfill";
// import fetch from 'fetch-polyfill';
import React from "react";
import ReactDOM from "react-dom";

import "../css/styles.css";
import App from "./App";

ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById("rootReact")
);

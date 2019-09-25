// Require the polyfill before requiring any other modules.
import "intersection-observer";

import * as React from "react";
import { render } from "react-dom";

import Lazy from "./Lazy";

import "./styles.css";

const items = [];

for (let i = 0; i < 100; i += 1) {
  items.push(i);
}

function App() {
  return (
    <ul id="app" className="App">
      {items.map(item => {
        return (
          <li key={item}>
            <Lazy>
              <span>
                <button>{item}</button>
              </span>
            </Lazy>
          </li>
        );
      })}
    </ul>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

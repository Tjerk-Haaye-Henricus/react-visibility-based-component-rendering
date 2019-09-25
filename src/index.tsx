// Require the polyfill before requiring any other modules.
import "intersection-observer";

import React from "react";
import { render } from "react-dom";

import Lazy, { LazyContext } from "./Lazy";

import "./styles.css";

const items = [];

for (let i = 1; i < 1000; i += 1) {
  items.push(i);
}

const percentageToBlurPixle = (percentage: number) => {
  if (percentage >= 90) {
    return 0;
  } else if (percentage >= 70) {
    return 1;
  } else if (percentage >= 60) {
    return 2;
  } else if (percentage >= 50) {
    return 3;
  } else if (percentage >= 40) {
    return 4;
  } else if (percentage >= 30) {
    return 5;
  }
  return 5;
};

function App() {
  return (
    <ul id="app" className="App">
      {items.map(item => {
        return (
          <li key={item} tabIndex={item}>
            <Lazy>
              <div className="lazy-loaded-content">
                <LazyContext.Consumer>
                  {({ percentage }) => (
                    <>
                      <img
                        src="https://source.unsplash.com/random"
                        alt="random"
                        width="300"
                        height="300"
                        style={{
                          filter: `blur(${percentageToBlurPixle(percentage)}px)`
                        }}
                      />
                    </>
                  )}
                </LazyContext.Consumer>
              </div>
            </Lazy>
          </li>
        );
      })}
    </ul>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

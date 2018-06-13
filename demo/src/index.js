import React, { Component } from "react";
import { render } from "react-dom";

import toast from "../../src";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-toast Demo</h1>
        <button onClick={this.show}>Show</button>
        <button onClick={this.noTimeout}>Without timeout</button>
        <button onClick={this.withRender}>Custom render</button>
        <button onClick={this.withReactNode}>With react node</button>
      </div>
    );
  }

  show = () => {
    toast.notify("Irure est ea deserunt labore ullamco est nisi labore in.");
  };

  noTimeout = () => {
    toast.notify("I will not disappear", {
      duration: 0
    });
  };

  withRender = () => {
    toast.notify(
      ({ onClose }) => {
        return (
          <div>
            Custom render <button onClick={onClose}>close</button>
          </div>
        );
      },
      {
        duration: 0
      }
    );
  };

  withReactNode = () => {
    toast.notify(<div>CUSTOM YO</div>);
  };
}

render(<Demo />, document.querySelector("#demo"));

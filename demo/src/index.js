import React, { Component } from "react";
import { render } from "react-dom";
import "./demo.css";
import toast from "../../src";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>Toasted Notes</h1>
        <div className="Example">
          <button onClick={this.show}>Basic example</button>
          <div>
            <pre>
              <code>
                {`
toast.notify("Irure est ea deserunt labore ullamco est nisi labore in.");
    `}
              </code>
            </pre>
          </div>
        </div>

        <div className="Example">
          <button onClick={this.noTimeout}>Without a duration timeout</button>
          <div>
            <pre>
              <code>
                {`
toast.notify("I will not disappear", {
  duration: 0
});
  `}
              </code>
            </pre>
          </div>
        </div>

        <div className="Example">
          <button onClick={this.withRender}>Custom render node</button>
          <div>
            <pre>
              <code>
                {`
toast.notify(
  <div>
    <h3>Custom react node</h3>
  </div>
);`}
              </code>
            </pre>
          </div>
        </div>

        <div className="Example">
          <button onClick={this.withReactNode}>With react node</button>
          <div>
            <pre>
              <code>
                {`

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

`}
              </code>
            </pre>
          </div>
        </div>
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
    toast.notify(
      <div>
        <h3>Custom react node</h3>
      </div>
    );
  };
}

render(<Demo />, document.querySelector("#demo"));

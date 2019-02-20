import React, { Component } from "react";
import { render } from "react-dom";
import "./demo.css";
import toast, { Position } from "../../src";

class Demo extends Component {
  render() {
    return (
      <div className="Demo">
        <h1>Toasted Notes</h1>
        <p>Flexible toast notifications for your react application.</p>

        <pre className="Command">
          <code>yarn install toasted-notes</code>
        </pre>

        <p>
          Learn more on{" "}
          <a href="https://github.com/bmcmahen/toasted-notes">Github</a>.
        </p>
        <h2>Examples</h2>
        <div className="Example">
          <h3>A basic example</h3>
          <div>
            <pre>
              <code>
                {`
import toast from 'toasted-notes';
import 'toasted-notes/umd/main.css';

toast.notify("Irure est ea deserunt labore ullamco est nisi labore in.");
    `}
              </code>
            </pre>
          </div>
          <button onClick={this.show}>Show notification</button>
        </div>

        <div className="Example">
          <h3>Using different positions</h3>
          <div>
            <pre>
              <code>
                {`
import toast, { Position } from 'toasted-notes';
import 'toasted-notes/umd/main.css';

// You can use: 
// 'top-left', 'top', 'top-right'
// 'bottom-left', 'bottom', and 'bottom-right'

Object.values(Position).forEach(position => {
  toast.notify("Using position " + position, {
    position
  });
});
              `}
              </code>
            </pre>
          </div>
          <button onClick={this.showPositions}>Show notifications</button>
        </div>

        <div className="Example">
          <h3>Without a duration timeout</h3>

          <div>
            <pre>
              <code>
                {`
import toast from 'toasted-notes';
import 'toasted-notes/umd/main.css';

toast.notify("I will not disappear", {
  duration: 0
});
  `}
              </code>
            </pre>
          </div>
          <button onClick={this.noTimeout}>Show notification</button>
        </div>

        <div className="Example">
          <h3>Using a custom render function</h3>

          <div>
            <pre>
              <code>
                {`
import toast from 'toasted-notes';
import 'toasted-notes/umd/main.css';

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
          <button onClick={this.withRender}>Show notification</button>
        </div>

        <div className="Example">
          <h3>Using a react node</h3>

          <div>
            <pre>
              <code>
                {`
import toast from 'toasted-notes';
import 'toasted-notes/umd/main.css';

toast.notify(
  <div>
    <h3>Custom react node</h3>
  </div>
);`}
              </code>
            </pre>
          </div>
          <button onClick={this.withReactNode}>Show notification</button>
        </div>
      </div>
    );
  }

  show = () => {
    toast.notify("Irure est ea deserunt labore ullamco est nisi labore in.");
  };

  noTimeout = () => {
    toast.notify("I will not disappear", {
      duration: 0,
      position: "bottom-right"
    });
  };

  showPositions = () => {
    Object.values(Position).forEach(position => {
      toast.notify("Using position " + position, {
        position
      });
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

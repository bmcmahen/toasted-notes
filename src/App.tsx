import * as React from "react";
import toaster, { Position } from "./Alert";
import "./App.css";
import "./prism.css";
import Prism from "prismjs";
import { PositionsType } from "./Alert/Message";

interface AppProps {}

export function App({  }: AppProps) {
  function showToast() {
    toaster.notify("hello world", {
      duration: null
    });
  }

  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Toasted Notes</h1>
        <p className="lead">
          Flexible toast notifications for your react application.
        </p>
        <div className="my-4" />
        <a
          className="btn btn-primary btn-lg"
          href="https://github.com/bmcmahen/toasted-notes"
        >
          Learn more on Github
        </a>
      </div>

      <div className="section-row">
        <section>
          <h4>Basic usage</h4>
          <pre>
            <code className="language-javascript">
              {`
import toast from 'toasted-notes';
import 'toasted-notes/umd/main.css';

toast.notify("Irure est ea deserunt labore ullamco est nisi labore in.");
    `}
            </code>
          </pre>
          <button
            className="btn btn-secondary"
            onClick={() => {
              toaster.notify(
                "Irure est ea deserunt labore ullamco est nisi labore in."
              );
            }}
          >
            View example
          </button>
        </section>

        <section>
          <h4>Using different positions</h4>
          <pre>
            <code className="language-javascript">
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
          <button
            className="btn btn-secondary"
            onClick={() => {
              Object.values(Position).forEach(position => {
                const p = position as PositionsType;
                toaster.notify("Using position: " + position, {
                  position: p
                });
              });
            }}
          >
            View example
          </button>
        </section>
      </div>

      <div className="section-row">
        <section>
          <h4>Without a duration</h4>
          <pre>
            <code className="language-javascript">
              {`
import toast from 'toasted-notes';
import 'toasted-notes/umd/main.css';

toast.notify("I will not disappear", {
  duration: null
});
  `}
            </code>
          </pre>
          <button
            className="btn btn-secondary"
            onClick={() => {
              toaster.notify("I will not disappear unless you tell me", {
                duration: null
              });
            }}
          >
            View example
          </button>
        </section>

        <section>
          <h4>Using a custom react node</h4>
          <pre>
            <code className="language-javascript">
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
          <button
            className="btn btn-secondary"
            onClick={() => {
              toaster.notify(
                <div>
                  <h3>Custom react node</h3>
                </div>
              );
            }}
          >
            View example
          </button>
        </section>
      </div>

      <div className="section-row">
        <section>
          <h4>Using a render callback</h4>
          <pre>
            <code className="language-javascript">
              {`
import toast from 'toasted-notes';
import 'toasted-notes/umd/main.css';

toast.notify(
  ({ onClose }) => {
    return (
      <div>
        Custom render <button className='btn btn-secondary' onClick={onClose}>close</button>
      </div>
    );
  },
  {
    duration: null
  }
);
  `}
            </code>
          </pre>
          <button
            className="btn btn-secondary"
            onClick={() => {
              toaster.notify(
                ({ onClose }) => {
                  return (
                    <div>
                      Custom render <button onClick={onClose}>close</button>
                    </div>
                  );
                },
                {
                  duration: null
                }
              );
            }}
          >
            View example
          </button>
        </section>
      </div>
    </div>
  );
}

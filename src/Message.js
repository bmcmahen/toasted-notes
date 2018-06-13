// @flow
import * as React from "react";
import Transition from "react-transition-group/Transition";
import Alert from "./Alert";
import "./ToastMessage.css";

const ANIMATION_DURATION = 240;

type MessageCallback = {
  onClose: () => void
};

export type MessageType = "default" | "success" | "error";

export type MessageProp = React.Node | (MessageCallback => React.Node) | string;

export type MessageOptions = {
  id: number,
  duration?: number,
  type: MessageType,
  onRequestRemove: () => void,
  showing: boolean
};

type Props = {
  message: MessageProp,
  ...MessageOptions,
  showing: boolean,
  animationDuration?: number,
  zIndex?: number
};

type State = {
  showing: boolean,
  height: number
};

export default class Message extends React.Component<Props, State> {
  _closeTimer: TimeoutID | null;

  state = {
    showing: true,
    height: 0
  };

  static defaultProps = {
    animationDuration: ANIMATION_DURATION,
    zIndex: 500
  };

  getVisibility = () => {
    if (!this.props.showing || !this.state.showing) {
      return false;
    }

    return true;
  };

  render() {
    return (
      <Transition
        appear
        unmountOnExit
        timeout={this.props.animationDuration}
        in={this.getVisibility()}
        onExisted={this.props.onRequestRemove}
      >
        {state => {
          return (
            <div
              data-state={state}
              className="Toaster__message"
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              style={{
                height: this.state.height,
                zIndex: this.props.zIndex,
                marginBottom: this.state.showing ? 0 : -this.state.height
              }}
            >
              <div
                ref={this.onRef}
                aria-describedby={
                  "notification-message-" + String(this.props.id)
                }
                role="alertdialog"
                className="Toaster__message-wrapper"
              >
                {this.renderMessage()}
              </div>
            </div>
          );
        }}
      </Transition>
    );
  }

  renderMessage = (): any => {
    const id = "notification-message-" + String(this.props.id);

    if (
      typeof this.props.message === "string" ||
      React.isValidElement(this.props.message)
    ) {
      return <Alert id={id} title={this.props.message} onClose={this.close} />;
    }

    if (typeof this.props.message === "function") {
      return this.props.message({
        id,
        onClose: this.closeTimer
      });
    }

    return null;
  };

  close = () => {
    if (this.props.onRequestRemove) {
      this.props.onRequestRemove();
    }
  };

  componentDidMount() {
    this.startCloseTimer();
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  startCloseTimer = () => {
    if (this.props.duration) {
      this._closeTimer = setTimeout(() => {
        this.closeTimer();
      }, this.props.duration);
    }
  };

  clearCloseTimer = () => {
    if (this._closeTimer) {
      clearTimeout(this._closeTimer);
      this._closeTimer = null;
    }
  };

  closeTimer = () => {
    this.setState({ showing: false });
    this.clearCloseTimer();
  };

  onMouseEnter = () => {
    this.clearCloseTimer();
  };

  onMouseLeave = () => {
    this.startCloseTimer();
  };

  onRef = (ref: ?HTMLElement) => {
    if (ref) {
      const height = ref.getBoundingClientRect().height;
      this.setState({ height });
    }
  };
}

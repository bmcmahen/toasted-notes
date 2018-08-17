// @flow
import * as React from "react";
import Message from "./Message";
import Positions from "./Positions";
import "./ToastManager.css";

import type {
  PositionsType,
  MessageProp,
  MessageOptions,
  MessageType
} from "./Message";

type Options = {
  type: string,
  duration?: number,
  position: PositionsType
};

type Props = {
  notify: Function => void
};

export type MessageOptionalOptions = {
  type?: MessageType,
  duration?: number,
  position?: PositionsType
};

type ToastArgs = {
  message: MessageProp,
  ...MessageOptions
};

type State = {
  top: Array<ToastArgs>,
  "top-left": Array<ToastArgs>,
  "top-right": Array<ToastArgs>,
  "bottom-left": Array<ToastArgs>,
  bottom: Array<ToastArgs>,
  "bottom-right": Array<ToastArgs>
};

export default class ToastManager extends React.Component<Props, State> {
  static idCounter = 0;

  state = {
    "top-left": [],
    top: [],
    "top-right": [],
    "bottom-left": [],
    bottom: [],
    "bottom-right": []
  };

  constructor(props: Props) {
    super(props);
    props.notify(this.notify);
  }

  notify = (message: MessageProp, options: MessageOptionalOptions) => {
    const toast = this.createToastState(message, options);
    const { position } = toast;

    // prepend the toast for toasts positioned at the top of
    // the screen, otherwise append it.
    const isTop = position.includes("top");

    this.setState(prev => {
      return {
        [position]: isTop
          ? [toast, ...prev[position]]
          : [...prev[position], toast]
      };
    });
  };

  createToastState = (
    message: MessageProp,
    options: MessageOptionalOptions
  ) => {
    const id = ++ToastManager.idCounter;

    // a bit messy, but object.position returns a number because
    // it's a method argument.
    const position =
      options.hasOwnProperty("position") && typeof options.position === "string"
        ? options.position
        : "top";

    return {
      id,
      message,
      position,
      showing: true,
      duration:
        typeof options.duration === "undefined" ? 5000 : options.duration,
      onRequestClose: () => this.closeToast(id, position),
      onRequestRemove: () => this.removeToast(id, position),
      type: options.type
    };
  };

  // set toast to not showing, which triggers an animation
  closeToast = (id: number, position: PositionsType) => {
    this.setState(prev => {
      return {
        [position]: prev[position].map(toast => {
          if (toast.id === id) {
            return {
              ...toast,
              showing: false
            };
          }
          return toast;
        })
      };
    });
  };

  // actually fully remove the toast
  removeToast = (id: number, position: PositionsType) => {
    this.setState(prev => {
      return { [position]: prev[position].filter(toast => toast.id !== id) };
    });
  };

  render() {
    return Object.keys(this.state).map(position => {
      const toasts = this.state[position];
      return (
        <span
          key={position}
          className={"Toaster__manager-" + position}
          style={{ pointerEvents: toasts.length > 0 ? "auto" : "none" }}
        >
          {toasts.map((toast: ToastArgs) => {
            return <Message key={toast.id} {...toast} />;
          })}
        </span>
      );
    });
  }
}

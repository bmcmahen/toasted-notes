// @flow
import * as React from "react";
import Message from "./Message";
import "./ToastManager.css";
import type { MessageProp, MessageOptions, MessageType } from "./Message";

type Options = {
  type: string,
  duration?: number
};

type Props = {
  notify: Function => void
};

export type MessageOptionalOptions = {
  type?: MessageType,
  duration?: number
};

type ToastArgs = {
  message: MessageProp,
  ...MessageOptions
};

type State = {
  toasts: Array<ToastArgs>
};

export default class ToastManager extends React.Component<Props, State> {
  static idCounter = 0;

  state = {
    toasts: []
  };

  constructor(props: Props) {
    super(props);
    props.notify(this.notify);
  }

  notify = (message: MessageProp, options: MessageOptionalOptions) => {
    const toast = this.createToastState(message, options);
    // prepend our toast newest toast
    this.setState(prev => {
      return { toasts: [toast, ...prev.toasts] };
    });
  };

  createToastState = (
    message: MessageProp,
    options: MessageOptionalOptions
  ) => {
    const id = ++ToastManager.idCounter;

    return {
      id,
      message,
      showing: true,
      duration:
        typeof options.duration === "undefined" ? 5000 : options.duration,
      onRequestRemove: () => this.closeToast(id),
      type: options.type
    };
  };

  // set toast to not showing, which triggers an animation
  closeToast = (id: number) => {
    this.setState(prev => {
      return {
        toasts: prev.toasts.map(toast => {
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
  removeToast = (id: number) => {
    this.setState(prev => {
      return { toasts: prev.toasts.filter(toast => toast.id !== id) };
    });
  };

  render() {
    const { toasts } = this.state;
    return (
      <span
        className="Toaster__manager"
        style={{ pointerEvents: toasts.length > 0 ? "auto" : "none" }}
      >
        {toasts.map((toast: ToastArgs) => {
          return <Message key={toast.id} {...toast} />;
        })}
      </span>
    );
  }
}

import * as React from "react";
import {
  Message,
  PositionsType,
  MessageType,
  MessageOptions,
  MessageProp
} from "./Message";

interface Props {
  notify: (fn: Function) => void;
}

export interface MessageOptionalOptions {
  type?: MessageType;
  duration?: number | null;
  position?: PositionsType;
}

interface ToastArgs extends MessageOptions {
  message: MessageProp;
}

type State = {
  top: Array<ToastArgs>;
  "top-left": Array<ToastArgs>;
  "top-right": Array<ToastArgs>;
  "bottom-left": Array<ToastArgs>;
  bottom: Array<ToastArgs>;
  "bottom-right": Array<ToastArgs>;
};

export default class ToastManager extends React.Component<Props, State> {
  static idCounter = 0;

  state: State = {
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
        ...prev,
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
      onRequestRemove: () => this.removeToast(String(id), position),
      type: options.type
    };
  };

  // actually fully remove the toast
  removeToast = (id: string, position: PositionsType) => {
    this.setState(prev => {
      return {
        ...prev,
        [position]: prev[position].filter(toast => toast.id !== id)
      };
    });
  };

  render() {
    return Object.keys(this.state).map(position => {
      const p = position as keyof State;
      const toasts = this.state[p];
      return (
        <span key={position} className={"Toaster__manager-" + position}>
          {toasts.map((toast: ToastArgs) => {
            return <Message position={p} key={toast.id} {...toast} />;
          })}
        </span>
      );
    });
  }
}

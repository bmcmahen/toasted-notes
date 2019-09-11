import * as ReactDOM from "react-dom";
import * as React from "react";
import ToastManager, { MessageOptionalOptions } from "./ToastManager";
import { MessageProp } from "./Message";

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";
const PORTAL_ID = "react-toast";

class Toaster {
  createNotification?: Function;
  removeAll?: Function;

  constructor() {
    if (!isBrowser) {
      return;
    }

    let portalElement;
    const existingPortalElement = document.getElementById(PORTAL_ID);

    if (existingPortalElement) {
      portalElement = existingPortalElement;
    } else {
      const el = document.createElement("div");
      el.id = PORTAL_ID;
      el.className = "Toaster";
      if (document.body != null) {
        document.body.appendChild(el);
      }
      portalElement = el;
    }

    ReactDOM.render(
      <ToastManager notify={this.bindNotify as any} />,
      portalElement
    );
  }

  closeAll = () => {
    if (this.removeAll) {
      this.removeAll();
    }
  };

  bindNotify = (fn: Function, removeAll: Function) => {
    this.createNotification = fn;
    this.removeAll = removeAll;
  };

  notify = (message: MessageProp, options: MessageOptionalOptions = {}) => {
    if (this.createNotification) {
      this.createNotification(message, options);
    }
  };
}

export default Toaster;

import * as ReactDOM from "react-dom";
import * as React from "react";
import ToastManager, { MessageOptionalOptions } from "./ToastManager";
import { MessageProp } from "./Message";

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";
const PORTAL_ID = "react-toast";

class Toaster {
  createNotification?: Function;

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

    ReactDOM.render(<ToastManager notify={this.bindNotify} />, portalElement);
  }

  bindNotify = (fn: Function) => {
    this.createNotification = fn;
  };

  notify = (message: MessageProp, options: MessageOptionalOptions = {}) => {
    if (this.createNotification) {
      this.createNotification(message, options);
    }
  };
}

export default Toaster;

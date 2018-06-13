// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import ToastManager from "./ToastManager";
import type { MessageProp } from "./Message";
import type { MessageOptionalOptions } from "./ToastManager";

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";
const PORTAL_ID = "react-toast";

class Toaster {
  createNotification: Function;

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
    this.createNotification(message, options);
  };
}

export default Toaster;

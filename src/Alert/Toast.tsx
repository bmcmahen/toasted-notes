import * as ReactDOM from "react-dom";
import * as React from "react";
import ToastManager, { MessageOptionalOptions } from "./ToastManager";
import { MessageProp, PositionsType } from "./Message";

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";
const PORTAL_ID = "react-toast";

class Toaster {
  createNotification?: Function;
  removeAll?: Function;
  closeToast?: Function;

  private didInit: boolean = false;

  setRoot = (root: HTMLElement) => {
    if (!isBrowser || this.didInit) {
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
      if (root != null) {
        root.appendChild(el);
        this.didInit = true
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

  bindNotify = (fn: Function, removeAll: Function, closeToast: Function) => {
    this.createNotification = fn;
    this.removeAll = removeAll;
    this.closeToast = closeToast;
  };

  notify = (message: MessageProp, options: MessageOptionalOptions = {}) => {
    if (!this.didInit && isBrowser) {
      this.setRoot(document.body)
    }

    if (this.createNotification) {
      return this.createNotification(message, options);
    }
  };

  close = (id: number, position: PositionsType) => {
    if (this.closeToast) {
      this.closeToast(id, position);
    }
  }
}

export default Toaster;

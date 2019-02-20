import { PositionsType } from "./es/Alert/Message";
import { MessageProp } from "./lib/Alert/Message";

declare module "toasted-notes" {
  export type ToastPositions = PositionsType;

  export interface ToastOptions {
    position?: ToastPositions;
    duration?: number | null;
  }

  type ToastMessage = MessageProp;

  class Toaster {
    notify(message: ToastMessage, options?: ToastOptions): void;
  }

  const Toast: Toaster;
  export default Toast;
}

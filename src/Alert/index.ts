import Toaster from "./Toast";
import { PositionsType, MessageProp } from "../../es/Alert/Message";
import { MessageOptionalOptions } from "../../lib/Alert/ToastManager";

const toaster = new Toaster();

export { default as Position } from "./Positions";

export type ToastPositions = PositionsType;
export type ToastMessage = MessageProp;
export type ToastOptions = MessageOptionalOptions;

export default toaster;

import * as React from "react";
import { useTransition, animated } from "react-spring";
import ReachAlert from "@reach/alert";
import Alert from "./Alert";
import { useTimeout } from "./useTimeout";
import POSITIONS from "./Positions";
import "./ToastMessage.css";

interface MessageCallback {
  id: string;
  onClose: () => void;
}

export type MessageType = "default" | "success" | "error";

export type PositionsType = keyof typeof POSITIONS;

export type MessageProp =
  | React.ReactNode
  | ((callback: MessageCallback) => React.ReactNode)
  | string;

export interface MessageOptions {
  id: string;
  duration: number | null;
  type: MessageType;
  onRequestRemove: () => void;
  onRequestClose: () => void;
  showing: boolean;
  position: PositionsType;
}

interface Props extends MessageOptions {
  message: MessageProp;
  zIndex?: number;
  position: PositionsType;
}

export const Message = ({
  id,
  message,
  position,
  onRequestRemove,
  duration = 30000
}: Props) => {
  const container = React.useRef<HTMLDivElement | null>(null);
  const [timeout, setTimeout] = React.useState(duration);
  const [localShow, setLocalShow] = React.useState(true);

  const isFromTop =
    position === "top-left" || position === "top-right" || position === "top";

  useTimeout(close, timeout);

  const animation = {
    config: { mass: 1, tension: 185, friction: 26 },
    from: {
      opacity: 1,
      height: 0,
      transform: `translateY(${isFromTop ? "-100%" : 0}) scale(1)`
    },
    enter: () => (next: any) =>
      next({
        opacity: 1,
        height: container.current!.getBoundingClientRect().height,
        transform: `translateY(0) scale(1)`
      }),
    leave: { opacity: 0, height: 0, transform: `translateY(0) scale(0.9)` },
    onRest
  };

  const transition = useTransition(localShow, null, animation as any);

  function onMouseEnter() {
    setTimeout(null);
  }

  function onMouseLeave() {
    setTimeout(duration);
  }

  function onRest() {
    if (!localShow) {
      onRequestRemove();
    }
  }

  function close() {
    setLocalShow(false);
  }

  function renderMessage() {
    if (typeof message === "string" || React.isValidElement(message)) {
      return <Alert id={id} title={message} onClose={close} />;
    }

    if (typeof message === "function") {
      return message({
        id,
        onClose: close
      });
    }

    return null;
  }

  return (
    <React.Fragment>
      {transition.map(
        ({ key, item, props }: { key: string; item: any; props: any }) =>
          item && (
            <animated.div
              key={key}
              className="Toaster__message"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              style={{
                opacity: props.opacity,
                height: props.height
              }}
            >
              <animated.div
                style={{
                  transform: props.transform
                }}
                ref={container}
                className="Toaster__message-wrapper"
              >
                <ReachAlert>{renderMessage()}</ReachAlert>
              </animated.div>
            </animated.div>
          )
      )}
    </React.Fragment>
  );
};
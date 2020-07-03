import * as React from "react";

interface Props {
  id: string;
  title: React.ReactNode | string;
  onClose: () => void;
  className?: string;
}

const Alert = ({ id, title, onClose, className = '' }: Props) => {
  return (
    <div id={id} className={`Toaster__alert ${className}`}>
      {typeof title === "string" ? (
        <div className="Toaster__alert_text">{title}</div>
      ) : (
        title
      )}

      {onClose && <Close onClose={onClose} />}
    </div>
  );
};

const Close = ({ onClose }: { onClose: () => void }) => (
  <button
    className="Toaster__alert_close"
    type="button"
    aria-label="Close"
    onClick={onClose}
  >
    <span aria-hidden="true">×</span>
  </button>
);

export default Alert;

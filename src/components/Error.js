import React from "react";

const Error = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <i className="fas fa-exclamation-circle error-icon"></i>
      <p className="error-message">{message}</p>
      <button className="retry-button" onClick={onRetry}>
        <i className="fas fa-redo"></i> Try Again
      </button>
    </div>
  );
};

export default Error;

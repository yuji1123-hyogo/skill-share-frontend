import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className="error-message" style={{ color: "red" }}>{message}</p>;
};

export default ErrorMessage;

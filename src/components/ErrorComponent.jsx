import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <div>
      <h1>Bad API Request :)</h1>
      <h1>{message.message}</h1>
    </div>
  );
};

export default ErrorComponent;

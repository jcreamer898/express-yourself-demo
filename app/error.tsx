import * as React from "react";

export default ({
  message,
  error,
}) => (
  <div>
    <div>{message}</div>
    <div>{error.stack}</div>
  </div>
)

import * as React from "react";
import { StyleRoot } from "radium";
import Home from "../modules/home";

export default ({
  poi,
  userAgent,
}) => (
  <StyleRoot
    radiumConfig={{
      userAgent,
    }}
  >
    <Home
      poi={poi}
    />
  </StyleRoot>
)

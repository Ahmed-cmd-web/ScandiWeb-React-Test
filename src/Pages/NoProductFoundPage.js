/** @format */

import React, { Component } from "react";

export default class NoProductFoundPage extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>This Product Does not Exist.</h1>
        <p>Look for a different one or check the pathname entered.</p>
      </div>
    );
  }
}

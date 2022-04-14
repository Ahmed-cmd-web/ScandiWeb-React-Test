/** @format */

import React, { Component } from "react";
import Menu, { Divider, MenuItem } from "rc-menu";
export default class AppMenuItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Menu>
        {this.props?.items?.map((e, i) => (
          <div>
            <MenuItem key={i}>{e.title}</MenuItem>
            <Divider />
          </div>
        ))}
      </Menu>
    );
  }
}

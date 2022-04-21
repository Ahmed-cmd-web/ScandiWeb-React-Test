/** @format */

import React, { Component } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import styled from "styled-components";

export default class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.handleChangeF = this.handleChangeF.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
  }
  //handlechangeForward
  handleChangeF = () => {
    if (this.state.index === this.props.gallery?.length - 1) {
      this.setState({ index: 0 });
      return;
    }
    this.setState({ index: this.state.index + 1 });
  };
  //handlechangeBackward
  handleChangeB = () => {
    if (this.state.index === 0) {
      this.setState({ index: this.props.gallery?.length - 1 });
      return;
    }
    this.setState({ index: this.state.index - 1 });
  };
  mounted = false;

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) setInterval(this.handleChangeF, 2000);
  }

  render() {
    return (
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <img
          style={this.props.ImgStyle}
          src={this.props.gallery[this.state.index]}
          alt=""
        />
        {this.props.gallery?.length > 1 && (
          <NavigationButton style={{ left: 0 }} onClick={this.handleChangeB}>
            <FiChevronLeft />
          </NavigationButton>
        )}
        {this.props.gallery?.length > 1 && (
          <NavigationButton onClick={this.handleChangeF} style={{ right: 0 }}>
            <FiChevronRight />
          </NavigationButton>
        )}
      </div>
    );
  }
}

const NavigationButton = styled.span`
  position: absolute;
  z-index: 9999;
  top: 50%;
  color: black;
  font-size: 20px;
  display: flex;
  align-items: center;
  &:hover {
    border-radius: 99px;
    color: white;
    background-color: black;
  }
`;

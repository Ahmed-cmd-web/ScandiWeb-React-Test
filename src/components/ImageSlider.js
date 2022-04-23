/** @format */

import React, { Component } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import styled from "styled-components";

export default class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      intervalId: 0,
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
  componentDidMount() {
    const intervalId = setInterval(this.handleChangeF, 5000);
    this.setState({ intervalId });
  }
  // cleanup on unmount
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "0px 10px",
        }}
      >
        <img
          style={this.props.ImgStyle}
          src={this.props.gallery[this.state.index]}
          alt=""
        />
        {this.props.gallery?.length > 1 && (
          <NavigationButton
            style={{ right: "25px" }}
            onClick={this.handleChangeB}
          >
            <FiChevronLeft />
          </NavigationButton>
        )}
        {this.props.gallery?.length > 1 && (
          <NavigationButton
            onClick={this.handleChangeF}
            style={{ right: "0%" }}
          >
            <FiChevronRight />
          </NavigationButton>
        )}
      </div>
    );
  }
}

const NavigationButton = styled.span`
  position: absolute;
  bottom: 0%;
  font-size: 18px;
  display: flex;
  align-items: center;
  color: white;
  background-color: black;
`;

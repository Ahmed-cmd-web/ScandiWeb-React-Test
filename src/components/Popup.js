/** @format */

import React, { Component } from "react";
import { BsCart2 } from "react-icons/bs";
import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";

export default class Popup extends Component {
  render() {
    return (
      <Container>
        <PopupContainer
          active={this.props.active}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <PopupContent active={this.props.active}>
            {this.props.children}
            <GrFormClose
              onClick={this.props.onClick}
              style={{
                position: "absolute",
                right: "1%",
                zIndex: 999,
                cursor: "pointer",
              }}
            />
          </PopupContent>
        </PopupContainer>
        <HoverButtonContainer
          disabled={!this.props.inStock}
          onClick={(e) => {
            e.stopPropagation();
            this.props.inStock && this.props.onClick();
          }}
        >
          <BsCart2 color="white" size={"60%"} />
        </HoverButtonContainer>
      </Container>
    );
  }
}

const PopupContainer = styled.div(
  ({ active }) => `
  background-color: lightskyblue;
  display: flex;
  min-width: ${active ? "calc(100% +20px)" : "5%"};
  min-height: ${active ? "calc(100% +20px)" : "5%"};
  opacity: ${active ? "1" : "0"};
  position: absolute;
  padding:5px;
  right: 40%;
  bottom: 30%;
  transition: opacity 0.2ms ease-in ${active ? "0s" : "1s"},
    min-width 0.5s

`
);
const PopupContent = styled.div(
  ({ active }) => `
  display: flex;
  flex-direction: column;
  max-height: ${active ? "300px" : "0px"};
  max-width: ${active ? "300px" : "0px"};
  opacity: ${active ? 1 : 0};
  overflow: scroll;
  cursor: default;
  transition:max-width 0.5s,  max-height 0.5s linear ${
    active ? "0.5s" : "0.3s"
  },
  opacity 0.5s ease-in-out ${active ? "0.5s" : "0s"};
`
);
export const Container = styled.span`
  display: none;
  position: absolute;
  right: 5%;
  bottom: 5%;
  z-index: 99;
`;
const HoverButtonContainer = styled.div`
  background-color: #5ece7b;
  width: 35px;
  height: 35px;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:active {
    opacity: 0.5;
  }
`;

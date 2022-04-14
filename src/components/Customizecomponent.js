/** @format */

import React, { Component } from "react";
import styled from "styled-components";
import { ContentBoxSpan } from "./ContentBox";

export default class Customizecomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
    };
  }
  render() {
    const {
      type,
      name,
      items,
      onSelection,
      titleStyle,
      ContainerStyle,
      BoxStyle,
      changeable = true,
    } = this.props;
    return (
      <div style={ContainerStyle}>
        <ContentBoxSpan style={titleStyle}>{name}:</ContentBoxSpan>
        <div
          style={{
            width: "100%",
            display: "flex",
            margin: "10px 0px",
          }}
        >
          {items?.map((e, i) => {
            return type === "swatch" ? (
              <SwatchBox
                style={BoxStyle}
                onClick={() => {
                  if (!changeable) return;
                  onSelection(name, e.value, i);
                  this.setState({ active: i });
                }}
                active={i === this.state.active}
                value={e.value}
                key={i}
              />
            ) : (
              <TextBox
                style={BoxStyle}
                onClick={() => {
                  if (!changeable) return;
                  onSelection(name, e.value, i);
                  this.setState({ active: i });
                }}
                active={i === this.state.active}
                key={i}
              >
                {e.displayValue}
              </TextBox>
            );
          })}
        </div>
      </div>
    );
  }
}

const SwatchBox = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background-color: ${({ value }) => value};
  opacity: ${({ active }) => (active ? 0.3 : 1)};
  &:hover {
    opacity: 0.3;
  }
`;

const TextBox = styled.span`
  border: 1px solid black;
  padding: 10px;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }

  background-color: ${({ active }) => (active ? "black" : null)};
  color: ${({ active }) => (active ? "white" : "black")};
`;

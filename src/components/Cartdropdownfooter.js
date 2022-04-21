/** @format */

import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

class Cartdropdownfooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }
  render() {
    return (
      <TotalWrapper>
        <Row>
          <span style={{ fontWeight: "bold" }}>Total:</span>
          <span>
            {this.props.currency.symbol}
            {this.props.total}
          </span>
        </Row>
        <Row>
          <DropdownButton
            bg={"transparent"}
            onClick={() => {
              this.setState({ clicked: true }, () => {
                this.setState({ clicked: false });
              });
              return false;
            }}
          >
            {this.state.clicked && <Navigate to={`/Cart`} />}
            VIEW CART
          </DropdownButton>
          <DropdownButton bg={"rgba(94, 206, 123, 1)"} color={"white"}>
            CHECKOUT
          </DropdownButton>
        </Row>
      </TotalWrapper>
    );
  }
}

const TotalWrapper = styled.div`
  height: 90px;
  width: 90%;
  margin: auto;
  padding: 20px;
  display: flex;
  align-items:center ;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  justify-content: space-between;
`;

const DropdownButton = styled.button`
  flex: 1;
  margin: 5px;
  height: 50px;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  border-width: 0.5px;
  font-size: 18px;
  cursor: pointer;
`;

export default Cartdropdownfooter;

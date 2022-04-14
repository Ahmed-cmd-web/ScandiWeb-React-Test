/** @format */

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import CurrentCurrency from "../utility/Currentcurrency";
import { BsCart2 } from "react-icons/bs";
import { ADD_TO_BASKET } from "../Store/reducer";
class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }
  render() {
    const {
      id,
      gallery,
      brand,
      description,
      name,
      prices,
      inStock,
      attributes,
      currency,
      ADD_TO_BASKET,
    } = this?.props;
    const UsedCurrency = CurrentCurrency(prices, currency);
    return (
      <ProductCardWrapper
        onClick={() => {
          this.setState({ clicked: true }, () => {
            this.setState({ clicked: false });
          });
          return false;
        }}
        setHover={(e) => this.setState({ hovered: e })}
      >
        {this.state.clicked && <Navigate to={`/PDP/${id}`} />}
        <Content inStock={inStock}>
          <ContentImage
            src={gallery[0]}
            alt={description}
            style={{ width: "300px" }}
          />
        </Content>
        <span style={{ fontWeight: "lighter", marginBottom: "5px" }}>
          {brand}
          {name}
        </span>
        <span
          style={{
            fontFamily: "Raleway",
          }}
        >
          {prices && UsedCurrency.currency.symbol}
          {prices && UsedCurrency.amount}
        </span>
        {attributes && attributes.length === 0 && inStock && (
          <HoveringCartIcon
            onClick={(e) => {
              e.stopPropagation();
              ADD_TO_BASKET({
                id,
                name,
                brand,
                prices,
                img: gallery[0],
                attributes,
                selectedAttrs: {},
              });
            }}
          >
            <BsCart2 color="white" size={"60%"} />
          </HoveringCartIcon>
        )}
      </ProductCardWrapper>
    );
  }
}

const HoveringCartIcon = styled.span`
  display: none;
  position: absolute;
  border-radius: 999px;
  background-color: #5ece7b;
  width: 35px;
  height: 35px;
  right: 5%;
  bottom: 5%;
  z-index: 999;
  &:active {
    opacity: 0.5;
  }
`;

const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: "center";
  width: 30%;
  background-color: white;
  min-width: 300px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    z-index: 20;
  }
  &:hover ${HoveringCartIcon} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ContentImage = styled.img`
  width: 300px;
  height: 300px;
  display: flex;
  line-height: 150px;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  margin-bottom: 15px;
  width: 300px;
  height: 300px;
  position: relative;
  align-self: center;
  &:before {
    content: "OUT OF STOCK";
    position: absolute;
    font-weight: lighter;
    font-size: x-large;
    display: flex;
    justify-content: center;
    align-items: center;
    inset: 0;
    opacity: ${({ inStock }) => (inStock ? 0 : 0.8)};
    background-color: white;
  }
`;

const mapState = ({ currency }) => ({
  currency,
});
const dispatch = { ADD_TO_BASKET };
export default connect(mapState, dispatch)(ProductCard);

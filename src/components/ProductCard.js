/** @format */

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import CurrentCurrency from "../utility/Currentcurrency";
import { ADD_TO_BASKET } from "../Store/reducer";
import Popup, { Container } from "./Popup";
import { AddToCartButton } from "./ContentBox";
import Customizecomponent from "./Customizecomponent";
import _ from "lodash";
import handleSelection from "../utility/handleSelection";
import isAllSelected from "../utility/isAllSelected";
class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      disabled: true,
      PopupActive: false,
    };
    this.handleSelection = handleSelection.bind(this);
    this.isAllSelected = isAllSelected.bind(this);
  }
  componentDidMount() {
    // To ensure that products with no attributes are not disabled
    this.setState({ disabled: this.props.attributes?.length > 0 });
  }
  componentDidUpdate(_, prevState) {
    if (JSON.stringify(prevState) === JSON.stringify(this.state)) return;
    isAllSelected(this.props?.attributes, this.state, (e) => this.setState(e));
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
          <ContentImage src={gallery[0]} alt={description} />
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
        <Popup
          inStock={inStock}
          onClick={() => {
            if (
              !this.state.PopupActive &&
              attributes?.length === 0 &&
              inStock
            ) {
              ADD_TO_BASKET({
                id,
                name,
                brand,
                prices,
                gallery,
                attributes,
                selectedAttrs: _.omit(
                  this.state,
                  "disabled",
                  "PopupActive",
                  "clicked"
                ),
              });
              return;
            }
            this.setState({ PopupActive: !this.state.PopupActive });
          }}
          active={this.state.PopupActive}
        >
          {attributes?.map((e, i) => (
            <Customizecomponent
              ContainerStyle={{
                width: "100%",
                overflowX: "hidden",
                height: "min-content",
              }}
              BoxStyle={{
                fontSize: "70%",
              }}
              TitleStyle={{ fontSize: "100%" }}
              onSelection={(property, value, index) =>
                this.handleSelection(property, value, index, (e) =>
                  this.setState(e)
                )
              }
              key={i}
              {...e}
            />
          ))}

          <AddToCartButton
            onClick={() => {
              ADD_TO_BASKET({
                id,
                name,
                brand,
                prices,
                gallery,
                attributes,
                selectedAttrs: _.omit(
                  this.state,
                  "disabled",
                  "PopupActive",
                  "clicked"
                ),
              });
              this.setState({ PopupActive: !this.state.PopupActive });
            }}
            disabled={inStock ? this.state.disabled : true}
          >
            {inStock ? "ADD TO CART" : "OUT OF STOCK"}
          </AddToCartButton>
        </Popup>
      </ProductCardWrapper>
    );
  }
}
const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: "center";
  width: 33%;
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
  &:hover ${Container} {
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
  object-fit: contain;
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

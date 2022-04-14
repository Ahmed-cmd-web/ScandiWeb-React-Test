/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { INCREMENT_QUANTITY, DECREMENT_QUANTITY } from "../Store/reducer";
import CurrentCurrency from "../utility/Currentcurrency";
import { ContentBoxSpan } from "./ContentBox";
import Customizecomponent from "./Customizecomponent";

class CartComponent extends Component {
  render() {
    const {
      id,
      prices,
      currency,
      name,
      img,
      brand,
      attributes,
      selectedAttrs,
      quantity,
      INCREMENT_QUANTITY,
      DECREMENT_QUANTITY,
      ContainerStyles = {},
    } = this?.props;

    const UsedCurrency = CurrentCurrency(prices, currency);
    return (
      <CartComponentWrapper style={ContainerStyles}>
        <CartComponentContent>
          <LeftSide>
            <div
              style={{
                overflow: "scroll",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ContentBoxSpan style={{ fontSize: "100%" }}>
                  {brand}
                </ContentBoxSpan>
                <ContentBoxSpan style={{ fontSize: "100%" }}>
                  {name}
                </ContentBoxSpan>
              </div>
              <ContentBoxSpan style={{ fontSize: "100%" }}>
                {UsedCurrency.currency.symbol}
                {UsedCurrency.amount}
              </ContentBoxSpan>

              {attributes?.map((e, i) => {
                let newObject = { ...e };
                newObject["active"] = selectedAttrs[e.name].index;
                return (
                  <Customizecomponent
                    titleStyle={{ fontSize: 14 }}
                    BoxStyle={{
                      height: "20px",
                      width: "20px",
                      fontSize: "60%",
                    }}
                    ContainerStyle={{ padding: "0px", flex: 1 }}
                    key={i}
                    changeable={false}
                    {...newObject}
                  />
                );
              })}
            </div>
          </LeftSide>{" "}
          <RightSide>
            <QuantityContainer>
              <CartButton
                type="button"
                onClick={() =>
                  INCREMENT_QUANTITY({
                    id,
                    selectedAttrs,
                  })
                }
              >
                +
              </CartButton>
              {quantity}
              <CartButton
                type="button"
                onClick={() =>
                  DECREMENT_QUANTITY({
                    id,
                    selectedAttrs,
                  })
                }
              >
                -
              </CartButton>
            </QuantityContainer>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={img}
                alt=""
                style={{
                  width: "80%",
                  objectFit: "contain",
                }}
              />
            </div>
          </RightSide>
        </CartComponentContent>
      </CartComponentWrapper>
    );
  }
}

const CartComponentWrapper = styled.div`
  width: 100%;
  height: 150px;
  margin: 10px 0px;
`;
const CartComponentContent = styled.div`
  display: flex;
  width: 95%;
  height: 100%;
  margin: auto;
  justify-content: space-between;
`;
const LeftSide = styled.div`
  width: 250px;
`;
const RightSide = styled.div`
  display: flex;
  width: 200px;
`;
const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5px;
  height: 100%;
  justify-content: space-between;
`;
const CartButton = styled.button`
  background-color: white;
  border-radius: 0;
  border-width: 1px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const mapStateToProps = ({ currency }) => ({ currency });
const dispatch = { INCREMENT_QUANTITY, DECREMENT_QUANTITY };
export default connect(mapStateToProps, dispatch)(CartComponent);
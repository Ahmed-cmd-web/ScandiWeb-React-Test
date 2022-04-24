/** @format */

import React, { Component } from "react";
import { FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_BASKET,
} from "../Store/reducer";
import CurrentCurrency from "../utility/Currentcurrency";
import AppAccordion from "./AppAccordion";
import { ContentBoxSpan } from "./ContentBox";
import Customizecomponent from "./Customizecomponent";
import ImageSlider from "./ImageSlider";

class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: -1,
    };
  }
  render() {
    const {
      id,
      prices,
      currency,
      name,
      gallery,
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
                  <AppAccordion
                    onClick={(e) => {
                      e.stopPropagation();
                      i === this.state.active
                        ? this.setState({ active: -1 })
                        : this.setState({ active: i });
                    }}
                    active={i === this.state.active}
                    title={newObject.name}
                    key={i}
                  >
                    <Customizecomponent
                      withTitle={false}
                      TitleStyle={{ fontSize: 14 }}
                      BoxStyle={{
                        height: "20px",
                        width: "20px",
                        fontSize: "60%",
                      }}
                      ContainerStyle={{ padding: "0px", flex: 1 }}
                      changeable={false}
                      {...newObject}
                    />
                  </AppAccordion>
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
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <ImageSlider
                gallery={gallery}
                ImgStyle={{
                  maxWidth: "100px",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <FaTrash
              onClick={() =>
                this.props.REMOVE_FROM_BASKET({
                  id,
                  selectedAttrs,
                })
              }
              style={{ paddingTop: "5px", cursor: "pointer" }}
            />
          </RightSide>
        </CartComponentContent>
      </CartComponentWrapper>
    );
  }
}

const CartComponentWrapper = styled.div`
  width: 500px;
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
  min-width: 200px;
  justify-content: flex-end;
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
const dispatch = { INCREMENT_QUANTITY, DECREMENT_QUANTITY, REMOVE_FROM_BASKET };
export default connect(mapStateToProps, dispatch)(CartComponent);

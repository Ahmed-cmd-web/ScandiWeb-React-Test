/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CartComponent from "../components/CartComponent";
import totalQuantity from "../utility/BasketQuantity";
import BASKET_TOTAL from "../utility/BasketTotal";

class Cart extends Component {
  render() {
    return (
      <CartWrapper>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ fontFamily: "Raleway", fontWeight: "bolder" }}>Cart</h1>
        </div>
        {this.props?.basket?.map((e, i) => (
          <CartComponent
            ContainerStyles={{
              height: "200px",
              width: "100%",
              borderTop: "0.5px solid rgba(229, 229, 229, 1)",
              padding: "5px 0px 0px 0px",
            }}
            key={i}
            {...e}
          />
        ))}
        <div
          style={{
            borderTop: "0.5px solid rgba(229, 229, 229, 1)",
          }}
        >
          <h3>Tax: $15.00</h3>
          <h3>Qty: {totalQuantity(this.props.basket)}</h3>
          <h2 style={{ fontFamily: "Raleway" }}>
            Total: {this.props.currency.symbol}
            {BASKET_TOTAL(this.props.basket, this.props.currency) +
              15}
          </h2>
        </div>
      </CartWrapper>
    );
  }
}

const CartWrapper = styled.div`
  margin-top: 40px;
  width: 95%;
  margin: 50px auto;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

const mapStateToProps = ({ basket, currency }) => ({ basket, currency });
export default connect(mapStateToProps)(Cart);

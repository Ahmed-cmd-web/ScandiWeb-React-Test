/** @format */

import React, { Component } from "react";
import styled from "styled-components";
import Tabs from "./Tabs";
import { RiShoppingBag2Fill } from "react-icons/ri";
import colors from "../content/colors";
import AppDropDown from "./AppDropDown";
import { FiShoppingCart } from "react-icons/fi";
import getCurrencies from "../Api/getCurrencies";
import { connect } from "react-redux";
import { SET_CURRENCY } from "../Store/reducer";
import { Link } from "react-router-dom";
import CartComponent from "./CartComponent";
import Cartdropdownfooter from "./Cartdropdownfooter";
import BASKET_TOTAL from "../utility/BasketTotal";
import totalQuantity from "../utility/BasketQuantity";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
    };
  }
  componentDidMount() {
    getCurrencies()
      .then((e) => {
        this.props.SET_CURRENCY(e.data[0]);
        this.setState({ currencies: e.data });
        return false;
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <Wrapper style={{ padding: "20px 5vw" }}>
        <Wrapper style={{ flex: 1 }}>
          <Tabs />
        </Wrapper>
        <Link to={"/"}>
          <RiShoppingBag2Fill
            size={35}
            color={colors.green}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <Wrapper style={{ flex: 1, justifyContent: "flex-end" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "30%",
              justifyContent: "space-evenly",
            }}
          >
            <AppDropDown
              list={this.state.currencies}
              title={this.props.currency && this.props.currency.symbol}
              chevron={true}
              onClick={this.props.SET_CURRENCY}
            />
            <AppDropDown
              customComponent={CartComponent}
              badge={this.props.basket.length > 0}
              badgeContent={totalQuantity(this.props.basket)}
              list={this.props.basket}
              title={<FiShoppingCart />}
              Overlay={true}
              drpTitle={`My Bag, ${totalQuantity(this.props.basket)} items`}
              footer={
                <Cartdropdownfooter
                  total={BASKET_TOTAL(this.props.basket, this.props.currency)}
                  currency={this.props.currency}
                />
              }
            />
          </div>
        </Wrapper>
      </Wrapper>
    );
  }
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  z-index: 99;
  height: 20%;
  top: 0;
  background-color: white;
`;

const state = ({ currency, basket }) => ({
  currency,
  basket,
});
const dispatch = { SET_CURRENCY };
export default connect(state, dispatch)(Header);

/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CurrentCurrency from "../utility/Currentcurrency";
import Customizecomponent from "./Customizecomponent";
import colors from "../content/colors";
import parse from "html-react-parser";
import { ADD_TO_BASKET } from "../Store/reducer";
import _ from "lodash";
import handleSelection from "../utility/handleSelection";
import isAllSelected from "../utility/isAllSelected";
class ContentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
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
      prices,
      currency,
      name,
      brand,
      attributes,
      description,
      inStock = false,
      gallery,
      ADD_TO_BASKET,
    } = this?.props;
    const UsedCurrency = CurrentCurrency(prices, currency);
    return (
      <ContentBoxWrapper>
        <ContentBoxSpan
          style={{
            fontWeight: "bold",
          }}
        >
          {brand}
        </ContentBoxSpan>
        <ContentBoxSpan
          style={{
            fontWeight: "lighter",
          }}
        >
          {name}
        </ContentBoxSpan>
        {attributes?.map((e, i) => (
          <Customizecomponent
            ContainerStyle={{ margin: "10px 0px", width: "100%" }}
            onSelection={(property, value, index) =>
              this.handleSelection(property, value, index, (e) =>
                this.setState(e)
              )
            }
            key={i}
            {...e}
          />
        ))}
        <ContentBoxSpan>Price:</ContentBoxSpan>
        <ContentBoxSpan>
          {UsedCurrency?.currency?.symbol}
          {UsedCurrency?.amount}
        </ContentBoxSpan>
        <div style={{ height: "80px" }}>
          <AddToCartButton
            onClick={() =>
              ADD_TO_BASKET({
                id,
                name,
                brand,
                prices,
                gallery,
                attributes,
                selectedAttrs: _.omit(this.state, "disabled"),
              })
            }
            disabled={inStock ? this.state.disabled : true}
          >
            {inStock ? "ADD TO CART" : "OUT OF STOCK"}
          </AddToCartButton>
        </div>
        <div style={{ overflow: "scroll" }}>
          {description && parse(description)}
        </div>
      </ContentBoxWrapper>
    );
  }
}

const ContentBoxWrapper = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  margin: 0px 10%;
  flex-direction: column;
`;
export const ContentBoxSpan = styled.span`
  font-size: 30px;
  font-family: Raleway;
`;

export const AddToCartButton = styled.button`
  width: 100%;
  max-width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.green};
  border: 0px;
  color: white;
  font-size: 16;
  font-weight: 600;
  font-family: Raleway;
  margin: 15px 0px;
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    pointer-events: none;
  }
  &:active {
    background-color: darkgreen;
  }
  &:hover {
    opacity: 0.7;
  }
`;

const mapStateToProps = ({ currency }) => ({ currency });
const dispatch = { ADD_TO_BASKET };
export default connect(mapStateToProps, dispatch)(ContentBox);

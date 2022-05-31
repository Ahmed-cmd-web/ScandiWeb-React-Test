/** @format */

import React, { Component } from "react";
import styled from "styled-components";
import getProducts from "../Api/getProducts";
import ProductCard from "./ProductCard";
import { connect } from "react-redux";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      loading: true,
      title: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title === this.props.title) return;
    getProducts(this.props.title)
      .then((e) => {
        this.setState({ product: e.data?.products, loading: e.loading });
        return false;
      })
      .catch((e) => console.log(e));
  }
  // componentDidMount()  was used to fetch the data from the api again
  // when the user clicks the browser's back button.
  componentDidMount() {
    getProducts(this.props.title)
      .then((e) => {
        this.setState({ product: e.data?.products, loading: e.loading });
        return false;
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <BodyWrapper>
        <span
          style={{ fontWeight: "lighter", fontSize: "40px", margin: "50px" }}
        >
          {this.props.title && this.props.title.toUpperCase()}
        </span>
        <ProductsWrapper>
          {!this.state.loading &&
            this.state.product?.map((e, i) => <ProductCard {...e} key={i} />)}
        </ProductsWrapper>
      </BodyWrapper>
    );
  }
}

const BodyWrapper = styled.div`
  width: 100vw;
  margin: 20px auto;
  height: fit-content;
`;
const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 33%));
  justify-items: center;
  width: 100%;
  height: 100%;
`;

const mapStateToProps = (state) => ({
  title: state.active,
});
export default connect(mapStateToProps)(Body);




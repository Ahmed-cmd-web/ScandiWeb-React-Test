/** @format */

import React, { Component } from "react";
import getProduct from "../Api/getProduct";
import styled from "styled-components";
import ContentBox from "../components/ContentBox";
import NoProductFoundPage from "./NoProductFoundPage";
export default class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      currentImg: null,
      NoProductFound: false,
    };
  }
  _isMounted = false;
  Visible = false;
  componentWillUnmount() {
    // cleanup to prevent memory leak
    this._isMounted = false;
    this.Visible = false;
  }
  componentDidMount() {
    this._isMounted = true;
    getProduct(window.location.pathname.substring(5))
      .then((e) => {
        this.Visible = true;
        if (this._isMounted) {
          if (!e.data) this.setState({ NoProductFound: true });
          this.setState({
            product: e.data,
            currentImg: e.data?.product?.gallery && e.data?.product?.gallery[0],
          });
        }

        return false;
      })
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <PDPWrapper>
        {this.state.NoProductFound ? (
          <NoProductFoundPage />
        ) : (
          <Product>
            <ProductImageOptionContainer>
              {this.state?.product?.gallery?.map((e, i) => (
                <ProductImageOption
                  src={e}
                  key={i}
                  onClick={() => {
                    this.setState({ currentImg: e });
                    return false;
                  }}
                />
              ))}
            </ProductImageOptionContainer>

            <img
              src={
                this.state.currentImg ||
                (this.state.product?.gallery && this.state.product?.gallery[0])
              }
              alt=""
              style={{ objectFit: "contain", height: "90%" }}
            />
            {this.Visible && <ContentBox {...this.state?.product} />}
          </Product>
        )}
      </PDPWrapper>
    );
  }
}

const PDPWrapper = styled.div`
  height: 600px;
  max-width: 100%;
  margin: 40px 20px;
`;
const ProductImageOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;
const Product = styled.div`
  padding: 5vw;
  height: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    ${ProductImageOptionContainer} {
      flex-direction: row;
      margin-bottom: 20px;
      overflow-x: scroll;
    }
  }
`;
const ProductImageOption = styled.img`
  height: 80px;
  width: 80px;
  object-fit: contain;
  margin: 5px;
  cursor: pointer;
`;

/** @format */

import React, { Component } from "react";
import styled from "styled-components";
import getCatgs from "../Api/getCatgs";
import colors from "../content/colors";
import { SET_ACTIVE } from "../Store/reducer";
import { Wrapper } from "./Header";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      loading: false,
      clicked: false,
      active: this.content && this.content[0].name,
    };
  }
  componentDidMount() {
    getCatgs()
      .then((e) => {
        this.props.SET_ACTIVE(e.data.categories[0].name);
        this.setState({
          content: e.data.categories,
          loading: e.loading,
          active: e.data.categories[0].name,
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <Wrapper>
        {this.state.content.map((e, i) => (
          <Tab
            onClick={() => {
              if (window.location.pathname !== "/")
                this.setState({ clicked: true }, () => {
                  this.setState({ clicked: false });
                });
              this.props.SET_ACTIVE(e.name);
              this.setState({
                active: e.name,
              });
            }}
            active={this.state.active === e.name}
            key={i}
          >
            {e.name.toUpperCase()}
          </Tab>
        ))}
        {this.state.clicked && <Navigate to={"/"} />}
      </Wrapper>
    );
  }
}

const Tab = styled.span(
  ({ active }) => `
  width: auto;
  height: 40px;
  margin: 0px 10px 0px 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex:1;
 justify-content: center;


  color: ${active ? colors.green : colors.gray};
  &:after {
    content: " ";
    display: block;
    border: solid 1px ${colors.green};
    z-index: -1;
    top:25px;
    float:left;
    position:relative;
    transition: all 0.2s ease-in;
    transform: ${active ? "scaleX(1)" : "scaleX(0)"};
}
`
);
const _ = (state) => state;
const mapDispatchtoProps = { SET_ACTIVE };

export default connect(_, mapDispatchtoProps)(Tabs);

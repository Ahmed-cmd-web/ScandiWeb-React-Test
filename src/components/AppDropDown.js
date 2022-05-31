/** @format */

import React, { Component, createRef } from "react";
import styled from "styled-components";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { connect } from "react-redux";
import { SET_CURRENCY } from "../Store/reducer";
import Badge from "react-badger";
class AppDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.ref = createRef();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }
  handleOutsideClick = (e) => {
    if (this.ref && !this.ref.current.contains(e.target))
      this.setState({ visible: false });
  };

  render() {
    return (
      <div>
        <DrpContent>
          <DrpTitleWrapper
            onClick={(e) => {
              e.stopPropagation();
              this.setState({ visible: !this.state.visible });
            }}
          >
            <span>
              {this.props.title}
              {this.props.badge && (
                <Badge
                  animated
                  color="black"
                  offset={[-5, -5]}
                  style={{ color: "white", padding: "2px" }}
                >
                  {this.props.badgeContent}
                </Badge>
              )}
            </span>
            {this.props.chevron &&
              (this.state.visible ? <FiChevronUp /> : <FiChevronDown />)}
          </DrpTitleWrapper>

          <DrpWrapper
            ref={this.ref}
            style={
              this.state.visible
                ? {
                    display: "flex",
                    flexDirection: "column",
                  }
                : {
                    display: "none",
                  }
            }
          >
            {this.props.drpTitle && (
              <h4 style={{ marginLeft: "12px",fontFamily:'Raleway' }}>{this.props.drpTitle}</h4>
            )}
            {this.props.list.map((e, i) =>
              this.props?.customComponent ? (
                <this.props.customComponent {...e} key={i} />
              ) : (
                <DrpItem onClick={() => this.props.onClick(e)} key={i}>
                  {e.symbol} {e.label}
                </DrpItem>
              )
            )}
            {this.props?.footer && <Footer>{this.props?.footer}</Footer>}
          </DrpWrapper>
        </DrpContent>
        {this.state.visible && this.props.Overlay && <Overlay />}
      </div>
    );
  }
}

const DrpWrapper = styled.div`
  max-height: 400px;
  width: max-content;
  z-index: 999;
  display: none;
  position: absolute;
  top: 20px;
  right: 0px;
  background-color: white;
  overflow-y: scroll;
  border: 1px solid gainsboro;
`;
const Overlay = styled.div`
  display: flex;
  position: fixed;
  inset: 80px 0 0 0;
  z-index: 2;
  background-color: rgba(57, 55, 72, 0.22);
`;

const DrpContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const DrpTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 999;
`;
const DrpItem = styled.span`
  padding: 5px;
  color: black;
  cursor: pointer;
  min-width: max-content;
  border-bottom: 0.5px solid gainsboro;
  &:hover {
    background-color: #eeeeee;
  }
`;
const Footer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
`;

const _ = (state) => state;
const mapDispatchToProps = { SET_CURRENCY };
export default connect(_, mapDispatchToProps)(AppDropDown);

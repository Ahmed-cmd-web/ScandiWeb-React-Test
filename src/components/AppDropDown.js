/** @format */

import React, { Component } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import { connect } from "react-redux";
import { SET_CURRENCY } from "../Store/reducer";
import Badge from "react-badger";
class AppDropDown extends Component {
  render() {
    return (
      <div>
        <DrpContent>
          <DrpTitleWrapper>
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
            {this.props.chevron && <FiChevronDown />}
          </DrpTitleWrapper>

          <DrpWrapper>
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
        {this.props.Overlay && <Overlay />}
      </div>
    );
  }
}

const DrpWrapper = styled.div`
  max-height: 400px;
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
  display: none;
  position: fixed;
  inset:80px 0 0 0 ;
  z-index: 2;
  background-color: rgba(57, 55, 72, 0.22);
`;

const DrpContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  &:hover > ${DrpWrapper} {
    display: flex;
    flex-direction: column;
  }
  &:hover ~ ${Overlay} {
    display: flex;
  }
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
    background-color: rgba(0, 0, 0, 0.2);
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

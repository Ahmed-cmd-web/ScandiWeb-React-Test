/** @format */

import React, { Component } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styled from "styled-components";

export default class AppAccordion extends Component {
  render() {
    const { title, children, active, onClick } = this.props;
    return (
      <div style={{ maxWidth: "80%", margin: "0px" }}>
        <AccordionButton onClick={onClick}>
          {title}
          {active ? <FiChevronUp /> : <FiChevronDown />}
        </AccordionButton>
        <HiddenContent active={active}>{children}</HiddenContent>
      </div>
    );
  }
}

const HiddenContent = styled.div`
  display: block;
  background-color: white;
  max-height: ${(props) => (props.active ? "250px" : "0")};
  overflow: scroll;
  transition: max-height 0.2s ease-in-out;
`;
const AccordionButton = styled.button`
  width: fit-content;
  margin: 5px 0px;
  border: none;
  display: flex;
  align-items: center;
  border-radius: 99px;
  cursor: pointer;
  &:active {
    opacity: 0.2;
  }
`;

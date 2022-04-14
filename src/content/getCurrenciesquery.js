/** @format */

import { gql } from "@apollo/client";

const getCurrenciesquery = () => gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export default getCurrenciesquery;

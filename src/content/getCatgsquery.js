/** @format */

import { gql } from "@apollo/client";

const getCatgsQuery = () => gql`
  {
    categories {
      name
    }
  }
`;

export default getCatgsQuery;

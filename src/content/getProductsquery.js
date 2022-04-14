/** @format */

import { gql } from "@apollo/client";

const getProductsquery = (category) => gql`
      {
        category(input:{
          title:"${category}"
        }) {
          products {
            id
            gallery
            inStock
            name
            brand
            attributes{
              id
            }
            prices {
              amount
              currency {
                label
                symbol
              }
            }
          }
        }
      }
    `;

export default getProductsquery;

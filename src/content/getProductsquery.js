/** @format */

import { gql } from "@apollo/client";

const getProductsquery = (category) => gql`
      {
        category(input:{
          title:"${category}"
        }) {
          products {
            id
            name
            inStock
            category
            brand
            gallery
            description
            prices{
            amount
            currency{
              label
              symbol
            }
          }
            attributes {
              name
              items {
                displayValue
                value
                id
              }
              type
            }
          }
          }
        }

    `;

export default getProductsquery;

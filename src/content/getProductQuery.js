import { gql } from "@apollo/client";

const getProductQuery= (id)=>gql`
        {
          product(id:"${id}") {
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
      `;


      export default getProductQuery;
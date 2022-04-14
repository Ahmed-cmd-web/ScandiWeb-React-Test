/** @format */

import getProductsquery from "../content/getProductsquery";
import client from "./client";

const getProducts = async (category = "all") => {
  try {
    const { loading, data, error } = await client.query({
      query: getProductsquery(category),
    });
    return { loading, error, data: data.category };
  } catch (error) {
    console.log(error);
  }
};
export default getProducts;

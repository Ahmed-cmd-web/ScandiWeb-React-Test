/** @format */

import getProductQuery from "../content/getProductQuery";
import client from "./client";

const getProduct = async (id) => {
  try {
    const { loading, data, error, errors } = await client.query({
      query: getProductQuery(id),
    });
    return { loading, data: data?.product, error, errors };
  } catch (error) {
    console.log(error);
  }
};

export default getProduct;

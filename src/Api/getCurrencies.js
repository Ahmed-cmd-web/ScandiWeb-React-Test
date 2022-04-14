/** @format */

import getCurrenciesquery from "../content/getCurrenciesquery";
import client from "./client";

const getCurrencies = async () => {
  try {
    const { loading, data, error } = await client.query({
      query: getCurrenciesquery(),
    });
    return { loading, data: data.currencies, error };
  } catch (error) {
    console.log(error);
  }
};

export default getCurrencies;

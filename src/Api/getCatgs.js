/** @format */

import getCatgsquery from "../content/getCatgsquery";
import client from "./client";

const getCatgs = async () => {
  try {
    const { loading, data, error } = await client.query({
      query: getCatgsquery(),
    });
    return { loading, data, error };
  } catch (error) {
    console.log(error);
  }
};

export default getCatgs;

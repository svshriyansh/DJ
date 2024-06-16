import { useState } from "react";
import { customFetch } from "./helper";

export const useGetSongs = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    console.log("------getData------");
    customFetch("http://localhost:5000/api/v1/getSongs")
      .then((res) => setData(res || []))
      .catch((err) => console.log(err));
  };
  return { data, getData };
};

export const getData = () => ({});

// export default {useGetSongs, getData};
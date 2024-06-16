import React, { useEffect } from "react";
import { useGetSongs } from "../utility/useGetSongs";
const Songs = () => {
  const { data, getData } = useGetSongs();

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <div>Loading</div>;
  }
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Song Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {console.log("data", data?.tracks?.[0].name)}
            <td>
              {data?.tracks?.map((idx, ele) => {
                return <td key={idx}>{idx?.name}</td>;
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Songs;

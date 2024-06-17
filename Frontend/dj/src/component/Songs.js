import React, { useEffect } from "react";
import { useGetSongs } from "../utility/useGetSongs";
import AudioPlayer from "./AudioPlayer";
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
            {console.log("data", data?.tracks?.[0]?.name)}
            <td>
              {data?.tracks?.map((idx, ele) => {
                return <td key={idx}>{idx?.name}</td>;
              })}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h1>Audio Stream from Firebase</h1>
        <AudioPlayer filePath="disk-jokey-6b5e4.appspot.com/Tum-Hi-Ho-2.0%28PaglaSongs%29.mp3" />
      </div>
    </div>
  );
};

export default Songs;

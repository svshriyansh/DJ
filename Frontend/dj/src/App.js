import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Songs from "./component/Songs";
import UploadButton from "./component/UploadButton";
import UploadSong from "./component/UploadSong";

export default function App() {
  useEffect(() => {
    console.log("Test");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/songs" element={<Songs />}></Route>
        <Route path="/uploadSong" element={<UploadSong />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

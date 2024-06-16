import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Songs from "./component/Songs";

export default function App() {
  useEffect(() => {
    console.log("Test");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/songs" element={<Songs />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

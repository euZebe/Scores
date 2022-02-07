import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import "./App.css";
import NewGame from "./routes/new-game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-game" element={<NewGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

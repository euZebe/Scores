import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import "./App.css"
import GameConfig from "./routes/GameConfig"
import PlayGame from "./routes/PlayGame"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-game" element={<GameConfig />} />
        <Route path="/edit-game/:gameId" element={<GameConfig />} />
        <Route path="/play/:gameId" element={<PlayGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

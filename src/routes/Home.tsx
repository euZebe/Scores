import * as React from "react"
import { Link } from "react-router-dom"
import { useGames } from "../game"

const Home = () => {
  const games = useGames()
  return (
    <div className="App">
      <ul>
        {games.length === 0
          ? "No game yet"
          : games.map((game) => <li key={game.id}>{game.gameName}</li>)}
      </ul>
      <Link to="/new-game">New game</Link>
    </div>
  )
}

export default Home

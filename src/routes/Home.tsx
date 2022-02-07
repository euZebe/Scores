import * as React from "react"
import { Link } from "react-router-dom"
import { useGames } from "../game"
import { Game } from "../game.model"

const Home = () => {
  const { games, removeGame } = useGames()
  return (
    <div className="App">
      {games.length === 0
        ? "No game yet"
        : games.map((game: Game) => (
            <div key={game.id}>
              <div>{new Date(game.createdAt).toLocaleDateString()}</div>
              <div>
                {game.gameName}
                <button onClick={() => removeGame(game.id)}>🗑</button>
              </div>
              {game.players.map((player) => (
                <div key={player.playerName}>🧑🏻‍🦰{player.playerName}</div>
              ))}
            </div>
          ))}

      <Link to="/new-game">New game</Link>
    </div>
  )
}

export default Home

import * as React from "react"
import { useGame } from "../game"
import { ID } from "../game.model"
import { useParams } from "react-router-dom"

type PlayGameProps = {
  gameId: ID
}

const PlayGame = () => {
  const { gameId } = useParams<PlayGameProps>()
  const game = useGame(gameId)

  return game ? (
    <div>
      <h1>{game.gameName}</h1>
      <li>
        {game.players.map((player) => (
          <ul>{player.playerName}</ul>
        ))}
      </li>
    </div>
  ) : (
    <div>loading...</div>
  )
}

export default PlayGame

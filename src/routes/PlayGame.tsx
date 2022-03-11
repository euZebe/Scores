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
      <div className="flex justify-stretch">
        {game.players.map((player) => (
          <div>{player.playerName}</div>
        ))}
      </div>
    </div>
  ) : (
    <div>loading...</div>
  )
}

export default PlayGame

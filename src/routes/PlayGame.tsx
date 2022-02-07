import * as React from "react"
import { useGame, useGames } from "../game"
import { Game, ID } from "../game.model"
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
    </div>
  ) : (
    <div>loading...</div>
  )
}

export default PlayGame

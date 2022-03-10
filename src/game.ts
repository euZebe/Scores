import { v4 as uuid } from "uuid"
import { useEffect, useState } from "react"
import { EditGameForm, Game, ID, NewGameForm } from "./game.model"

const GAMES = "games"

function getGames(): Game[] {
  const gamesAsString = localStorage.getItem(GAMES)
  return !gamesAsString ? [] : JSON.parse(gamesAsString)
}

export function getGame(gameId: ID): Game | undefined {
  return getGames().find((game) => game.id === gameId)
}

export function useGames() {
  const [games, setGames] = useState<Game[]>(getGames)

  const removeGame = (idToRemove: ID) => {
    const updatedGamesList = games.filter((g) => g.id !== idToRemove)
    localStorage.setItem(GAMES, JSON.stringify(updatedGamesList))
    setGames(updatedGamesList)
  }

  return { games, removeGame }
}

export function useRemoveGame() {
  return
}

export async function createGame({
  gameName,
  playersNames,
}: NewGameForm): Promise<Game> {
  const newGame: Game = {
    id: uuid(),
    createdAt: new Date(),
    gameName,
    players: playersNames
      .filter(Boolean)
      .map((name) => ({ playerName: name, scores: [] })),
  }
  const games = getGames()
  await localStorage.setItem(GAMES, JSON.stringify([newGame, ...games]))
  return newGame
}

export function useGame(gameId?: ID) {
  const [game, setGame] = useState<Game>()
  useEffect(() => {
    const games = getGames()
    setGame(games.find((g) => g.id === gameId))
  }, [gameId])

  return game
}

export function updateGame(updatedGame: EditGameForm): void {
  const games = getGames()
  for (let game of games) {
    if (game.id === updatedGame.id) {
      Object.assign(game, {
        gameName: updatedGame.gameName,
        players: updatedGame.playersNames
          .filter(Boolean)
          .map((name) => ({ playerName: name, scores: [] })),
      })
      break
    }
  }
  localStorage.setItem(GAMES, JSON.stringify(games))
}

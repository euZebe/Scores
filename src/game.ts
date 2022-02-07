import { v4 as uuid } from "uuid"
import { useEffect, useState } from "react"

export type NewGameForm = {
  gameName: string
  playersNames: string[]
}

export type PlayerScore = {
  playerName: string
  scores: number[]
}

export type Game = {
  gameName: string
  createdAt: Date
  id: string
  players: PlayerScore[]
}

export function useGames() {
  const [games, setGames] = useState<Game[]>([])
  useEffect(() => {
    const gamesAsString = localStorage.getItem(GAMES)
    setGames(!gamesAsString ? [] : JSON.parse(gamesAsString))
  }, [])
  return games
}

export async function createGame({
  gameName,
  playersNames,
}: NewGameForm): Promise<Game> {
  const newGame: Game = {
    id: uuid(),
    createdAt: new Date(),
    gameName,
    players: playersNames.map((name) => ({ playerName: name, scores: [] })),
  }
  const gamesAsString = await localStorage.getItem(GAMES)
  const games = !gamesAsString ? [] : JSON.parse(gamesAsString)
  await localStorage.setItem(GAMES, JSON.stringify([newGame, ...games]))
  return newGame
}

const GAMES = "games"

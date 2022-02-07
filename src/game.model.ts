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

describe("create game", () => {
  it("should allow to create a game", () => {
    cy.fixture("new-game").then((newGame) => {
      cy.visit("/")
      cy.findByText(/new game/i)
        .should("exist")
        .click()
      cy.url().should("match", /\/new-game$/)

      cy.findByLabelText(/game name/i).type(newGame.gameName)
      cy.findByLabelText(/Player 0/).type(newGame.players[0])
      cy.findByText(/Add player/i).click()
      cy.findByLabelText(/Player 1/).type(newGame.players[1])

      cy.findByText(/submit/i).click()

      cy.url().should("match", /\/$/)
      cy.findByText(newGame.gameName).click()

      cy.url().should("match", /\/play\/.+/)
    })
  })
})

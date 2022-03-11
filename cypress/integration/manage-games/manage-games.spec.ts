describe("create game", () => {
  it("should allow to create a game", () => {
    cy.fixture("new-game").then((newGame) => {
      cy.visit("/")
      cy.findByText(/new game/i)
        .should("exist")
        .click()
      cy.url().should("match", /\/new-game$/)

      cy.findByLabelText(/game name/i).type(newGame.gameName)
      cy.findByLabelText(/Player 1/).type(newGame.players[0])
      cy.findByRole("button", { name: /add player/i }).click()
      cy.findByLabelText(/Player 2/).type(newGame.players[1])
      cy.findByRole("button", { name: /submit/i }).click()
      cy.url().should("match", /\/$/)

      // edit and add a player
      cy.findByText("✏️").click()
      cy.findByRole("button", { name: "Add player" }).click()
      cy.findByLabelText(/Player 3/).type(newGame.players[2])
      cy.findByLabelText(/Player 2/)
        .clear()
        .type("Julia")
      cy.findByRole("button", { name: /submit/i }).click()

      // see game
      cy.findByText(newGame.gameName).click()
      cy.url().should("match", /\/play\/.+/)
      cy.findByText(newGame.players[0])
      cy.findByText("Julia")
      cy.findByText(newGame.players[2])

      // delete game
      cy.go("back")
      cy.findByText("🗑").click()
      cy.findByText(/no game yet/i)
    })
  })
})

describe("Personal reading list", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adding a book", () => {
    cy.createUser().then(user => {
      cy.signIn(user)
    })

    cy.get("#root").should(
      "contain",
      "Hey there! Welcome to your reading list. Get started by heading over to"
    );

    cy.navigate("Discover");
    cy.get('[aria-label="Voice of War"]').within(() => {
      // Force click because somewhat cypress scrolls down
      // And we want to be sure that we can click the button
      cy.get('button[aria-label="Add to list"]').click({ force: true });

      cy.get('button[aria-label="Add to list"]').should("not.exist");
      cy.get('[aria-label="Mark as read"]').should("exist");
      cy.get('[aria-label="Remove from list"]').should("exist");
    });

    cy.navigate("Reading List")
    cy.get("main").find('[aria-label="Voice of War"]').should("exist");
  });
});

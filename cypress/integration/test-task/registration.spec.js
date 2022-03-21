import { faker } from "@faker-js/faker";

describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  function signUp({
    username = faker.internet.userName(),
    password = "password",
  } = {}) {
    cy.contains("Register").click();

    cy.get('[aria-label="Registration form"]').within(() => {
      cy.get("#username").type(username);

      cy.get("#password").type(password);

      cy.get("button[type=submit]").click();
    });
  }

  it("sign up", () => {
    signUp();

    cy.get("#root").should(
      "contain",
      "Hey there! Welcome to your reading list. Get started by heading over to "
    );
  });

  it("sign up existing user", () => {
    cy.createUser().then((user) => {
      signUp(user);
    });

    cy.get('div[role="alert"]').within(() => {
      cy.root().should("contain", "There was an error:");
      cy.root().should("contain", `Cannot create a new user with the username`);
    });
  });
});

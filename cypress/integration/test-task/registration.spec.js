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

    return { username, password };
  }

  it("sign up", () => {
    signUp();
// !!!
    cy.get(".css-k0qcqu button").should("contain", "Logout");
  });

  it("sign up existing user", () => {
    cy.createUser().then((user) => {
      signUp(user);
    });

    cy.get('div[role="alert"]').within(() => {
      cy.root().should("contain", "There was an error:");
      cy.root().should(
        "contain",
        `Cannot create a new user with the username`
      );
    });
  });
});

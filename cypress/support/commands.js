import { faker } from "@faker-js/faker";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "createUser",
  ({ username = faker.internet.userName(), password = "password" } = {}) => {
    return cy.window().then((win) => {
      return win
        .fetch("https://auth-provider.jk/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
        .then(response => response.json())
        .then(({ user }) => {
          win.localStorage.setItem(
            "__bookshelf_users__",
            JSON.stringify({
              [user.id]: {
                id: user.id,
                username: user.username,
                // Didn't get how to hash a password so just using hash of "password"
                passwordHash: "423803642",
              },
            })
          );
          return { username, password }
        });
    });
  }
);

Cypress.Commands.add("signIn", ({ username, password }) => {
  cy.contains("Login").click();

  cy.get('[aria-label="Login form"]').within(() => {
    cy.get("#username").type(username);
    cy.get("#password").type(password);

    cy.get("button[type=submit]").click();
  });
});

Cypress.Commands.add("navigate", (menuItem) => {
    cy.get("nav").contains(menuItem).click();
});


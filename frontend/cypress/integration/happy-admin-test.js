// RETAIN LOCAL STORAGE ACROSS TESTS.
let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
//

// Run with `yarn run cypress open`
context('happy path admin (test defined by specs)', () => {
  // requires email to be of a NON-existing account.
  const email = 'test1@test.com';

  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('registers successfully', () => {
    cy.visit('localhost:3000');
    cy.get('a').contains('Register instead').click();
    cy.url().should('include', '/register');

    cy.get('.email-input')
      .type(email)
      .should('have.value', email);
    cy.get('.name-input')
      .type('test')
      .should('have.value', 'test');
    cy.get('.password-input')
      .type('test')
      .should('have.value', 'test');
    cy.get('button[type=submit]').contains('Register').click();

    cy.url().should('include', '/dashboard');
  });

  it('creates a new game successfully', () => {
    cy.url().should('include', '/dashboard');

    cy.get('.create-game-button').click();
    cy.get('.new-game-name-input')
      .type('Test Game')
      .should('have.value', 'Test Game');
    cy.get('.create-game-normal-button').click();

    cy.get('.dashboard-game-title')
      .should('have.text', 'Test Game');
  });

  it('starts a game successfully', () => {
    cy.url().should('include', '/dashboard');

    cy.get('.dashboard-game-title')
    .should('have.text', 'Test Game');
    cy.get('button').contains('Start').click();
    cy.get('button').contains('Advance (Currently In: Lobby)')
      .should('have.text', 'Advance (Currently In: Lobby)');
  });

  it('ends a game successfully', () => {
    cy.url().should('include', '/dashboard');

    cy.get('.dashboard-game-title')
    .should('have.text', 'Test Game');
    cy.get('button').contains('End').click();
    cy.get('button').contains('Start Game')
      .should('have.text', 'Start Game');
  })

  it('loads the results page', () => {
    cy.url().should('include', '/dashboard');

    cy.get('button').contains('Yes').click();
    cy.url().should('include', '/results');
  });

  it('logouts out of the application successfully', () => {
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/login');
  });

  it('logs back into the application successfully', () => {
    cy.url().should('include', '/login');

    cy.get('.email-input')
      .type(email)
      .should('have.value', email);
    cy.get('.password-input')
      .type('test')
      .should('have.value', 'test');
    cy.get('button[type=submit]').contains('Log In').click();

    cy.url().should('include', '/dashboard');
  });
});

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
context('happy path admin for editing a game', () => {
  // requires email to be of a NON-existing account.
  const email = 'test2@test.com';

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

  it('opens the game to edit successfully', () => {
    cy.url().should('include', '/dashboard');

    cy.get('.dashboard-game-edit').first().click();
    cy.url().should('include', '/editgame');
  });

  it('creates a question successfully', () => {
    cy.url().should('include', '/editgame');
    cy.get('.create-question').click();

    cy.get('.edit-game-question-name')
      .should('have.text', 'New Question');
  });

  it('opens the question to edit successfully', () => {
    cy.url().should('include', '/editgame');

    cy.get('button').contains('Edit').click();
    cy.url().should('include', '/editgame');
  });

  it('changes question parameters and saves successfully', () => {
    cy.url().should('include', '/editgame');

    cy.get('.question-string')
      .clear()
      .type('This is the new question now.')
      .should('have.value', 'This is the new question now.');
      
      cy.get('.answer1-string')
        .clear()
        .type('This is the wrong answer now.')
        .should('have.value', 'This is the wrong answer now.');
      cy.get('.answer1-box')
        .uncheck()
        .should('not.be.checked')
      
      cy.get('.answer2-string')
        .clear()
        .type('This is the RIGHT answer now.')
        .should('have.value', 'This is the RIGHT answer now.');
      cy.get('.answer2-box')
        .check()
        .should('be.checked')

      cy.get('.question-type')
        .select('Multiple');
      
      cy.get('.answer3-string')
        .clear()
        .type("I am the right answer's son.")
        .should('have.value', "I am the right answer's son.");
      cy.get('.answer3-box')
        .check()
        .should('be.checked')
      
      cy.get('.question-time')
        .select('120');

      cy.get('.question-points')
      .select('4');
    
      cy.get('button').contains('Save').click();
      cy.url().should('include', '/editgame');
      cy.get('.edit-game-question-name')
      .should('have.text', 'This is the new question now.');
  });
});

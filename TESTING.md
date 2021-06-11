hi!

disclaimer!
-> our tests require that the 'email' const defined at the beginning of each test is that of a non-existing account in the database.
-> so you can edit that manually before each test, or reset the backend database before each run.

worked in a pair, so here's the 'happy' path of our second test in './frontend/cypress/integration/happy-admin-edit-test.js':
  Happy Path - Admin Edits A Game
  1. registers an account successfully (as with default path).
  2. creates a new game successfully (as with default path).
  3. opens the 'edit game' page for that game successfully.
  4. creates a new question successfully.
  5. opens the 'edit question' page for that question successfully.
  6. changes question paramaters including:
    - question string
    - correct and wrong answers
    - question type
    - time limit
    - point value
    and saves it successfully.
we thought we would explore editing actual game content as opposed to the default happy path, seeing how this is one of the core functionalities an admin requires out of the app. we alternatively considered the path of a player joining a game (which we considered the last 'core' functionality of the app), but it appears cypress does not have multiple tab/window support - so it was removed.

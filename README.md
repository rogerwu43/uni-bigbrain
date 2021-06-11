**Setting up the frontend**
Navigate to the `frontend` folder and run `yarn install` to install all of the dependencies necessary to run the ReactJS app.

**Setting up the backend**
After you clone this repo, you must run `yarn install` in `backend` directory once.

**Running the site**
To run the backend server, simply run `yarn start` in the `backend` directory. This will start the backend.

Run `yarn start` to start the ReactJS app.

**Notes**
The backend is persistent in terms of data storage. That means the data will remain even after your express server process stops running. If you want to reset the data in the backend, you can run `yarn reset` in the backend directory. If you want to make a copy of the backend data (e.g. for a backup) then simply copy `database.json`.

Once the backend has started, you can view the API documentation by navigating to `http://localhost:[port]` in a web browser.

The port that the backend runs on (and that the frontend can use) is specified in `frontend/src/config.json`.

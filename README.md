# lexiGo

![lexiGo](./assets/icons8-pencil-96.png)

It's a language learning application built on MERN stack. The frontend is hosted on **vercel** and the backend is hosted on the **railway**.

## Live Deployment Link: [http://lexi-go.vercel.app/](http://lexi-go.vercel.app/)

![lexiGo](./assets/Screenshot%202023-08-19%20183204.png)

## Installation

- `git clone <this_url>`
- install npm on client and server
  - `cd client`
  - `npm install`
  - `cd server`
  - `npm install`
- Configure Server
  - Create `.env` file in `server`
  - Update `.env` file with `MONGODB_URL=<YOUR MONGODB URL>`
  - Update `.env` file with `NODE_ENV=development` chanage this to production in production env variables.
  - Update `.env` file with `PORT=8000`
  - Update the API endpoint in the `index.js` in `cors` to `http://localhost:5173`
- Configure Client
  - Create `.env` file in `client`
  - Update `.env` file with `VITE_REACT_APP_FIREBASE_API_KEY=<YOUR FIREBASE API KEY>`
  - Update `.env` file with `VITE_REACT_APP_API_ENDPOINT=http://localhost:8000/api`
- Running the application in development mode
  - Development Mode (Client only): `cd client` then `npm run dev`
  - Development Mode (Server only): `cd server` then `npm run dev` then open `http://localhost:8000` in a browser

## Features

- You can learn multiple languages.
- Progress of each language will be store separately.
- Leaderboard of every language.
- You can change your language whenever you want without losing the progress of your previous languages.
- Mobile responsive.
- Dynamic questions. The difficulty of your next question will depend upon your answer to the previous.
- You can reset your progress of your current as well as previously selected language.

  > This is not it, wanted to add more things but due to time constraint couldn't. I have added functionality for admin prevailages but haven't design the UI and API for it.

## What can be done more

- Admin portal to create, delete, and edit langauges.
- A global leaderboard irrespective of the language.

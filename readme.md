# Workout Tracker
###### CMPT 354 Project

## Setup
1. `npm i`
2. Duplicate `.env-example` and rename to `.env` and update with your local postgresql DB credentials

### DB Setup (MacOS Steps)
1. `brew install postgresql` // Install PostgreSQL
2. `brew  services start postgresql` // Start PostgreSQL
3. `npm run db-up` // To create all tables

Side-Note: `npm run db-down` // To destroy DB

## Preview Steps
1. `npm run build` // Builds the project
2. `npm run start` // Starts the project
3. Visit `localhost:3000` on your browser

## Dev Steps 
1. `npm run build` // Builds client files into /dist/bundle.js. To watch for changes set the param `watch` to `true` in webpack.config.js
 
2. `npm run dev-start` // Starts server, and restarts server if files were changed


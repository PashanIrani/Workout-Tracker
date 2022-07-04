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

## Dev Steps 
1. `npm run dev-build` // Builds client files into /dist/bundle.js and also watches for changes so it can rebuild without having to execute the command again.
 
2. `npm run dev-start` // Starts server, and restarts server if files were changed



## About the project

This project applies some concepts like Dockerizing, Unit tests, third-party API's.

The goal of this project is to apply these concepts in order to provide simple Express server to consume a third-party API, map the raw data and expose the mapped date through an API which be consumed by a [SPA web application located in this repository](https://github.com/lash23/files-reader-frontend).

## Technologies

1. NodeJS.
2. Express.
3. Mocha, Chai and Supertest for unit test development
4. StandardJS for code linting
5. Docker & Docker Compose.

## Prerequisites
1. Node installed on the system.
2. npm installed on the system and using a version greater than or equal to 5.2.
3. Docker (optional)

## Usage

1. Install the project dependencies by running: `npm install`
2. Run standardJs linting `npm run standard`
3. Run tests: `npm run test`
4. Start back-end app: `npm run start` (back-end server will run at http://localhost:3000/ unless your 3000 port were already busy)

### Run using Docker
Optionally you could start the back-end server using Docker by running: `docker-compose up --build` (then back-end server will run at http://localhost:3000/)

## Available endpoints

`GET /files/data`: to get and show the mapped data.
`GET /files/list`: to get and show raw data without mapping it.
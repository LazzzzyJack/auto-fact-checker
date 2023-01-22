# Verif.AI

## Setup
`npm install`

## Run server
`npm run serve`

## Run client
`npm run dev`

## Description
Verif.AI uses OpenAI's knowledge base to automatically fact check a tweet or text inputted by the user. It can distinguish between factual statements and matters of opinion, and highlight the statement to reflect its truthfulness. Verif.AI also provides further context or explanation for factual statements, or corrections for false statements.

## Usage
Run `npm install` in the project directory to set up the necessary dependencies. Then, `npm run serve` and `npm run dev` in the same directory to start the server and client. Go to 'http://localhost:5173/' or click on the link provided in the terminal to go to the web client. The user can then choose to enter either text or a link to a tweet. Then, press "fact check" to begin the process.

## Technologies used
Node.js
Javascript
CSS
HTML
Dependencies:
    concurrently: 7.6.0
    cors: 2.8.5
    dotenv: 16.0.3
    express: 4.18.2
    nodemon: 2.0.20
    openai: 3.1.0
    puppeteer: 19.5.2

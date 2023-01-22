import * as dotenv from "dotenv";
import { textAnalysisApi } from "./textAnalysisApi.js";
import { tweeterScrapingApi } from "./tweeterScrapingApi.js";

dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

import express from "express";
import cors from "cors";

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

const data = {
  prompt:
    // "The Union possessed many features unique among contemporary states. Its political system was characterized by strict checks upon monarchical power. These checks were enacted by a legislature (sejm) controlled by the nobility (szlachta). This idiosyncratic system was a precursor to modern concepts of democracy. Although the two component states of the Commonwealth were formally equal, Poland was the dominant partner in the union. Identify the facts and seperate them with newlines.",
    "The Poké Ball is a type of Poké Ball introduced in Generation I. It is the most basic form of Poké Ball, an item used to catch a wild Pokémon. The eponymous Poké Ball is the most ubiquitous kind of Poké Ball across the entire Pokémon franchise. It is frequently used to represent the Pokémon series as a whole, such as in the Pokémon series' icon in the Super Smash Bros. series. Identify the facts and seperate them with newlines.",
  temperature: 0.5,
  max_tokens: 64,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
};

app.post("/factchecktext", async (req, res) => {
  const prompt = req.body.prompt;
  textAnalysisApi(data, prompt);
});

app.post("/factcheckurl", async (req, res) => {
  const prompt = req.body.prompt;
  tweeterScrapingApi(data, prompt);
});

app.listen(port, () => {
  console.log(`Avalible on http://localhost:${port}`);
});

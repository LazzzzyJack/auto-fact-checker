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

<<<<<<< HEAD
app.post("/factchecktext", async (req, res) => {
  const prompt = req.body.prompt;
  textAnalysisApi(data, prompt);
=======
const textAnalysis = async () => {
  try {
    var res = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${configuration.apiKey}`,
        },
        body: JSON.stringify(data),
      }
    );
    var response = await res.json();
    return response;
  } catch (error) {
    console.log("openAI:", error);
  }
};

app.post("/factchecktext", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    var response;
    textAnalysis().then((res) => {
      response = res;
      var responseText = response.choices[0].text;

      let factList = responseText.split("\n");
      console.log(factList);

      const filteredFacts = factList.filter(isFact);
      console.log("FACT LIST");
      console.log(filteredFacts);

      var formattedResponse = data.prompt;
      filteredFacts.forEach((element) => {
        formattedResponse = formattedResponse.replace(
          element,
          '<span style="color:red">' + element + "</span>"
        );
      });
      formattedResponse = formattedResponse.replace(
        " Identify the facts and seperate them with newlines.",
        ""
      );

      console.log("FORMATTED RESPONSE");
      console.log(formattedResponse);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
>>>>>>> main
});

app.post("/factchecktext", async (req, res) => {
  const prompt = req.body.prompt;
  tweeterScrapingApi(data, prompt);
});

app.listen(port, () => {
  console.log(`Avalible on http://localhost:${port}`);
});

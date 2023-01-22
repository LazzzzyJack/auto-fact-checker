import * as dotenv from "dotenv";
import { textAnalysisApi } from "./textAnalysisApi.js";
import { tweeterScrapingApi } from "./tweeterScrapingApi.js";
import express from "express";
import cors from "cors";
import { textAnalysisAi } from "./textAnalysisAi.js";

dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/factchecktext", async (req, res) => {
  const prompt =
    req.body.prompt + " Identify the facts and seperate them with newlines.";
  const data = {
    prompt: prompt,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  let formattedResponse = await textAnalysisApi(data, prompt, res);
  res.status(200).json({ textFormat: formattedResponse });
});

app.post("/factcheckurl", async (req, res) => {
  const data = {
    prompt: req.body.prompt,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  const url = req.body.prompt;
  var prompt = await tweeterScrapingApi(data, url, res);
  prompt = prompt + " Identify the facts and seperate them with newlines.";
  const data1 = {
    prompt: prompt,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  let response = await textAnalysisAi(data1, data1.prompt);
  var responseText = response.choices[0].text;
  let factList = responseText.split("\n");
  const filteredFacts = factList.filter((fact) => fact !== "" && fact !== " ");

  // get more info of each fact
  const infos = [];
  for (let i = 0; i < filteredFacts.length; i++) {
    const data2 = {
      prompt: filteredFacts[i],
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    let response3 = await textAnalysisAi(data2, filteredFacts[i]);
    var responseText3 = response3.choices[0].text;
    let info = responseText3.replace(/(\r\n|\n|\r)/gm, ""); // remove \n
    infos.push(info);
  }

  var formattedResponse = "";
  filteredFacts.forEach((element, i) => {
    formattedResponse =
      formattedResponse +
      `<span class="fact-tweeter">` +
      element +
      '<span class="fact-tip">' +
      infos[i] +
      "</span>" +
      "</span>";
  });

  res.status(200).json({ textFormat: formattedResponse });
});

app.listen(port, () => {
  console.log(`Avalible on http://localhost:${port}`);
});

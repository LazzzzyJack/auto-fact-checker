import * as dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

import express from 'express';
import cors from 'cors';

const port = process.env.PORT
const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, () => { console.log(`Server avalible on port ${port}`) });

const data = {
    prompt: "The Union possessed many features unique among contemporary states. Its political system was characterized by strict checks upon monarchical power. These checks were enacted by a legislature (sejm) controlled by the nobility (szlachta). This idiosyncratic system was a precursor to modern concepts of democracy, as of 1791 constitutional monarchy, and federation. Although the two component states of the Commonwealth were formally equal, Poland was the dominant partner in the union. Identify facts and opinions",
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

try {
    let res = await fetch(
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
    res = await res.json();
    console.log(res);
  }
  catch (error) {
    console.log("openAI:", error);
  }
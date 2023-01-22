import * as dotenv from "dotenv";
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

import express from "express";
import cors from "cors";

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

const data = {
  prompt:
    "The Polish–Lithuanian Commonwealth, formally known as the Kingdom of Poland and the Grand Duchy of Lithuania, was a bi-confederal state, sometimes called a federation, of Poland and Lithuania ruled by a common monarch in real union, who was both King of Poland and Grand Duke of Lithuania. It was one of the largest and most populous countries of 16th to 17th-century Europe. At its largest territorial extent, in the early 17th century, the Commonwealth covered almost 1,000,000 km2 (400,000 sq mi) and as of 1618 sustained a multi-ethnic population of almost 12 million. Polish and Latin were the two co-official languages. The Commonwealth was established by the Union of Lublin in July 1569, but the Crown of the Kingdom of Poland and the Grand Duchy of Lithuania had been in a de facto personal union since 1386 with the marriage of the Polish queen Jadwiga (Hedwig) and Lithuania's Grand Duke Jogaila, who was crowned King jure uxoris Władysław II Jagiełło of Poland. Identify facts and opinions.",
  temperature: 0.5,
  max_tokens: 64,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
};

const textAnalysis = async () => {
  try {
    // var res = await fetch(
    //   "https://api.openai.com/v1/engines/text-davinci-003/completions",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${configuration.apiKey}`,
    //     },
    //     body: JSON.stringify(data),
    //   }
    // );

    // var json = await res.json();
    var json = { title: "test test test" };
    // let data2 = unfluff(
    //   "https://www.polygon.com/2014/6/26/5842180/shovel-knight-review-pc-3ds-wii-u"
    // );
    console.log(data2);
    return json;
  } catch (error) {
    console.log("openAI:", error);
  }
};

app.post("/factcheck", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    textAnalysis().then((res) => {
      // console.log(res);
    });
    const ans = "some respond";
    res.send({ ans });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Avalible on http://localhost:${port}`);
});

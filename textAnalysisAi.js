import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

export const textAnalysisAi = async (data, prompt) => {
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

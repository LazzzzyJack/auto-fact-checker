import * as dotenv from "dotenv";
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

console.log("Hello world");

const openai = new OpenAIApi(configuration);

import express from "express";
import cors from "cors";

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

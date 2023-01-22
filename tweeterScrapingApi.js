import puppeteer from "puppeteer";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Configuration } from "openai";

dotenv.config();

export const tweeterScrapingApi = async (data, prompt) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(
      "https://twitter.com/BobLoukas/status/1616550342744743937",
      {
        waitUntil: "networkidle0",
      }
    );

    const result = await page.$eval(
      "article div[lang]",
      (tweet) => tweet.textContent
    );

    console.log(result);
    browser.close();
    return result;
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

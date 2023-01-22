import puppeteer from "puppeteer";
import * as dotenv from "dotenv";

dotenv.config();

export const tweeterScrapingApi = async (data, prompt, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(data.prompt, {
      waitUntil: "networkidle0",
    });

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

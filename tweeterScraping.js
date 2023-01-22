import puppeteer from "puppeteer";

const tweet = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://twitter.com/BobLoukas/status/1616550342744743937", {
    waitUntil: "networkidle0",
  });

  const result = await page.$eval(
    "article div[lang]",
    (tweet) => tweet.textContent
  );

  console.log(result);
  browser.close();
  return result;
};

tweet();

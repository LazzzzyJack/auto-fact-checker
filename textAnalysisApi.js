import { textAnalysisAi } from "./textAnalysisAi.js";

export const textAnalysisApi = async (data, prompt, res) => {
  try {
    var response = await textAnalysisAi(data, prompt);
    var responseText = response.choices[0].text;

    let factList = responseText.split("\n");
    console.log(factList);

    const filteredFacts = factList.filter((fact) => fact !== "");

    console.log("FACT LIST");
    console.log(filteredFacts);

    // check if the Fact is true or false
    const truths = [];
    for (let i = 0; i < filteredFacts.length; i++) {
      const data = {
        prompt: filteredFacts[i] + " True or False?",
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      let response2 = await textAnalysisAi(data, filteredFacts[i]);
      var responseText2 = response2.choices[0].text;
      let factList2 = responseText2.split("\n");
      const truth = isTrue(factList2); // only care about the first word (true or false), discard the rest
      truths.push(truth);
    }

    console.log("Context to truth Map");
    console.log(truths);

    // get more info of each fact
    const infos = [];
    for (let i = 0; i < filteredFacts.length; i++) {
      const data = {
        prompt: filteredFacts[i],
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      let response3 = await textAnalysisAi(data, filteredFacts[i]);
      var responseText3 = response3.choices[0].text;
      let info = responseText3.replace(/(\r\n|\n|\r)/gm, ""); // remove \n
      infos.push(info);
    }

    console.log("More Info");
    console.log(infos);

    var formattedResponse = data.prompt;
    filteredFacts.forEach((element, i) => {
      console.log(formattedResponse.includes(element));
      formattedResponse = formattedResponse.replace(
        element,
        `<span class="fact-${truths[i]}">` +
          element +
          '<span class="fact-tip">' +
          infos[i] +
          "</span>" +
          "</span>"
      );
    });
    formattedResponse = formattedResponse.replace(
      " Identify the facts and seperate them with newlines.",
      ""
    );

    console.log("FORMATTED RESPONSE");
    console.log(formattedResponse);
    return formattedResponse;
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

const isTrue = (texts) => {
  const filteredFacts2 = texts.filter((fact) => fact !== "");
  if (filteredFacts2) {
    return (
      filteredFacts2[0].toLowerCase().includes("yes") ||
      filteredFacts2[0].toLowerCase().includes("true") ||
      filteredFacts2[0].toLowerCase().includes("fact")
    );
  } else {
    return false;
  }
};

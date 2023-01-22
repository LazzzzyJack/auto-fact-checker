import { async } from "rxjs";
import { textAnalysisAi } from "./textAnalysisAi.js";

export const textAnalysisApi = async (data, prompt, res) => {
  try {
    var response = await textAnalysisAi(data, prompt);
    var responseText = response.choices[0].text;

    let factList = responseText.split("\n");
    console.log(factList);

    const filteredFacts = factList.filter((fact) => fact !== "");

    // check if the Fact is true or false
    // {context, isTrue}
    const truths = [];

    console.log("++++");
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
      console.log(response2);
      var responseText2 = response2.choices[0].text;
      let factList2 = responseText2.split("\n");
      const truth = isTrue(factList2);
      truths.push(truth);
    }

    console.log("Context to truth Map");
    console.log(truths);

    console.log("FACT LIST");
    console.log(filteredFacts);

    var formattedResponse = data.prompt;
    filteredFacts.forEach((element, i) => {
      formattedResponse = formattedResponse.replace(
        element,
        `<span class="fact-${truths[i]}">` + element + "</span>"
      );
    });
    formattedResponse = formattedResponse.replace(
      " Identify the facts and seperate them with newlines.",
      ""
    );

    console.log("FORMATTED RESPONSE");
    console.log(formattedResponse);
    return "hello";
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

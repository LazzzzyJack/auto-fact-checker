import { textAnalysisAi } from "./textAnalysisAi.js";

export const textAnalysisApi = async (data, prompt) => {
  try {
    var response;
    textAnalysisAi(data, prompt).then((res) => {
      response = res;
      var responseText = response.choices[0].text;

      let factList = responseText.split("\n");
      console.log(factList);

      const filteredFacts = factList.filter(isFact);
      console.log("FACT LIST");
      console.log(filteredFacts);

      var formattedResponse = data.prompt;
      filteredFacts.forEach((element) => {
        formattedResponse = formattedResponse.replace(
          element,
          '<span style="color:red">' + element + "</span>"
        );
      });
      formattedResponse = formattedResponse.replace(
        " Identify the facts and seperate them with newlines.",
        ""
      );

      console.log("FORMATTED RESPONSE");
      console.log(formattedResponse);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

function isFact(fact) {
  return fact != "";
}

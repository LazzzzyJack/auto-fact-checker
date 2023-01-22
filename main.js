import "./style.css";

const urlForm = document.querySelector(".url-form");
const textForm = document.querySelector(".text-form");
const inputContainer = document.querySelector(".input-container");
const outputContainer = document.querySelector(".output-container");
const pasteUrlButton = document.querySelector(".paste-button");
const urlTextarea = document.querySelector(".url-textarea");
const pasteTextButton = document.querySelector(".paste-article-button");
const textTextarea = document.querySelector(".text-textarea");
const resetButton = document.querySelector(".reset-button");
const articleContainer = document.querySelector(".article-text");
let isUrl = true;

const body = document.querySelector('body');

const backgrounds = [
"./backgrounds/absolutvision-WYd_PkCa1BY-unsplash.jpg", 
"backgrounds/christian-lue-7dEyTJ7-8os-unsplash.jpg",
"backgrounds/joshua-sukoff-5DDYHjk_KMU-unsplash.jpg",
];
const randomIndex = Math.floor(Math.random() * backgrounds.length);
const randomBackground = backgrounds[randomIndex];
body.style.backgroundImage = `url('${randomBackground}')`;
body.style.backgroundSize = "cover";

const getFactCheck = async (e) => {
  e.preventDefault();
  showSpinner();
  const data = isUrl ? new FormData(urlForm) : new FormData(textForm);
  const endpoint = isUrl ? "factcheckurl" : "factchecktext";

  const response = await fetch("http://localhost:8080/" + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  if (response.ok) {
    const ans = await response.json();
    console.log(ans);
    const fakeAnswer = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <span class="fact-true">Joe Biden won the 2020 election</span> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <span class="fact-false">Donald Trump won the 2020 election<span class="fact-tip">Joe Biden won the 2020 election.</span></span> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    articleContainer.innerHTML = fakeAnswer;

    const factTrue = document.querySelector(".fact-true");
    factTrue.style.color = "green";

    inputContainer.style.display = "none";
    outputContainer.style.display = "block";
  } else {
    const err = await response.text();
    alert("Something went wrong!");
  }

  hideSpinner();
};

function showSpinner() {
  const button = document.querySelector(".submit-button");
  button.disabled = true;
  button.innerHTML = 'Analyzing <span class="spinner">🧐</span>';
}

function hideSpinner() {
  const button = document.querySelector(".submit-button");
  button.disabled = false;
  button.innerHTML = "Fact Check 🤔";
}

pasteUrlButton.addEventListener("click", async () => {
  urlTextarea.focus();
  const data = await navigator.clipboard.readText();
  urlTextarea.value = data;
});

pasteTextButton.addEventListener("click", async () => {
  textTextarea.focus();
  const data = await navigator.clipboard.readText();
  textTextarea.value = data;
});

resetButton.addEventListener("click", async () => {
  inputContainer.style.display = "block";
  outputContainer.style.display = "none";
});

urlForm.addEventListener("submit", getFactCheck);
textForm.addEventListener("submit", getFactCheck);

// For the fancy toggle
const st = {};

st.flap = document.querySelector("#flap");
st.toggle = document.querySelector(".toggle");

st.choice1 = document.querySelector("#choice1");
st.choice2 = document.querySelector("#choice2");

st.flap.addEventListener("transitionend", () => {
  if (st.choice1.checked) {
    st.toggle.style.transform = "rotateY(-15deg)";
    urlForm.style.display = "none";
    textForm.style.display = "block";
    isUrl = false;
    setTimeout(() => (st.toggle.style.transform = ""), 50);
  } else {
    st.toggle.style.transform = "rotateY(15deg)";
    urlForm.style.display = "block";
    textForm.style.display = "none";
    isUrl = true;
    setTimeout(() => (st.toggle.style.transform = ""), 50);
  }
});

st.clickHandler = (e) => {
  if (e.target.tagName === "LABEL") {
    setTimeout(() => {
      st.flap.children[0].textContent = e.target.textContent;
    }, 50);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  st.flap.children[0].textContent = st.choice2.nextElementSibling.textContent;
});

document.addEventListener("click", (e) => st.clickHandler(e));

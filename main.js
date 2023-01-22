import "./style.css";

const urlForm = document.querySelector(".url-form");
const textForm = document.querySelector(".text-form");
let isUrl = true;

const getFactCheck = async (e) => {
  e.preventDefault();
  showSpinner();
  const data = isUrl ? new FormData(urlForm) : new FormData(textForm);
  const endpoint = isUrl ? 'factcheckurl' : 'factchecktext';

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
    const { ans } = await response.json();
  } else {
    const err = await response.text();
    alert("Something went wrong!");
  }

  hideSpinner();
}

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

const pasteUrlButton = document.querySelector('.paste-button');
const urlTextarea = document.querySelector('.url-textarea');

pasteUrlButton.addEventListener('click', async () => {
  urlTextarea.focus();
  const data = await navigator.clipboard.readText();
  urlTextarea.value = data;
});

const pasteTextButton = document.querySelector('.paste-article-button');
const textTextarea = document.querySelector('.text-textarea');

pasteTextButton.addEventListener('click', async () => {
  textTextarea.focus();
  const data = await navigator.clipboard.readText();
  textTextarea.value = data;
});

urlForm.addEventListener("submit", getFactCheck);
textForm.addEventListener("submit", getFactCheck);


// For the fancy toggle
const st = {};

st.flap = document.querySelector('#flap');
st.toggle = document.querySelector('.toggle');

st.choice1 = document.querySelector('#choice1');
st.choice2 = document.querySelector('#choice2');

st.flap.addEventListener('transitionend', () => {
    if (st.choice1.checked) {
        st.toggle.style.transform = 'rotateY(-15deg)';
        urlForm.style.display = "none";
        textForm.style.display = "block";
        isUrl = false;
        setTimeout(() => st.toggle.style.transform = '', 50);
    } else {
        st.toggle.style.transform = 'rotateY(15deg)';
        urlForm.style.display = "block";
        textForm.style.display = "none";
        isUrl = true;
        setTimeout(() => st.toggle.style.transform = '', 50);
    }
})

st.clickHandler = (e) => {

    if (e.target.tagName === 'LABEL') {
        setTimeout(() => {
            st.flap.children[0].textContent = e.target.textContent;
        }, 50);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    st.flap.children[0].textContent = st.choice2.nextElementSibling.textContent;
});

document.addEventListener('click', (e) => st.clickHandler(e));
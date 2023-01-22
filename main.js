import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(form);

  try {
      await timeout(10000);
      const response = await fetch('http://localhost:8080/factcheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt')
      }),
    });

    if (response.ok) {
      const { someAnswer } = await response.json();
  
      const result = document.querySelector('#result');
      result.innerHTML = `<img src="${image}" width="512" />`;
    } else {
      const err = await response.text();
      alert(err);
      console.log(err);
    }
  } catch {
    // alert("Request timeout after 10 seconds");
    console.log(err);
  }

  hideSpinner();
});

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Analyzing <span class="spinner">🧐</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Fact Check 🤔';
}
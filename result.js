import { currentScore } from "./script.js";


document.getElementById('tryAgainButton').addEventListener('click', () => {
  history.pushState(null, null, 'index.html');
  location.reload();
  localStorage.clear()
})

function generateResult() {
  const score = currentScore;
  let html = document.getElementById('myResult');
  html.innerHTML = `You got ${score} answers correct!`
}

generateResult();
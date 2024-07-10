//Using MOV method to create quiz

//get data from backend or json
let questions = [];

export function renderQuiz() {

  function getQuestions() {
    const promise = fetch('data.json').then((response) => {
      return response.json();
    }).then((questionsData) => {
      questionsData.forEach((question) => {
        questions.push(question)
      });
      generateQuiz();
    });
    
    return promise
  }

  //use question data to generate html

  function generateQuiz() {
    let html = '';
    let index = 1;
    questions.forEach((question) => {
      if (question.isMultipleChoice === 'true') {
        html += 
        `
      <div class="question">
        <p>
          ${index}. ${question.question}
        </p>
        <label for="A"><input class="radio" type="radio" name="q${index}" value="A">A. ${question.options.A}
        <span class="checkmark"></span></label><br>
        <label for="B"><input class="radio" type="radio" name="q${index}" value="B">B. ${question.options.B}
        <span class="checkmark"></span></label><br>
        <label for="C"><input class="radio" type="radio" name="q${index}" value="C">C. ${question.options.C}
        <span class="checkmark"></span></label><br>
        <label for="D"><input class="radio" type="radio" name="q${index}" value="D">D. ${question.options.D}
        <span class="checkmark"></span></label><br>
      </div>
        `
        index++;
      } else {
        html += 
        `
      <div class="question">
        <p>
        ${index}. ${question.question}
        </p>
        <label for="true"><input class="radio" type="radio" name="q${index}" value="true">${question.options.true}
        <span class="checkmark"></span></label><br>
        <label for="false"><input class="radio" type="radio" name="q${index}" value="false">${question.options.false}
        <span class="checkmark"></span></label><br>
      </div>
        `
        index++
      }
    });
    html += generateSubmitButton()

    document.querySelector('.questions').innerHTML = html;
  }

  function generateSubmitButton() {
    return`<button type="submit" form="quizForm">Submit</button>`
  }

  getQuestions();

  function handleSubmit(event) {
    event.preventDefault();
    const score = checkAnswers();
    if (score === 'false') {
      alert("You have not finished the quiz yet");
    } else {
      loadResult();
    }
  }

  document.getElementById('quizForm').addEventListener('submit', handleSubmit);

  function loadResult() {
    history.pushState(null, null, 'result.html');
    location.reload();
  }
}

export function checkAnswers() {
  let score = 0;
  let index = 1;
  let answered = 0;

  const userAnswer = document.querySelectorAll(`input:checked`);
  userAnswer.forEach(() => {
    answered++
  })

  questions.forEach((question) => {
    const userAnswer = document.querySelector(`input[name="q${index}"]:checked`);
    
    if (userAnswer && userAnswer.value === question.correctAnswer) {
      score++;
      
    }
    index++;
  });
  console.log(answered)
  if (answered !== 10) {
    return 'false'; 
  } else {
    saveToStorage(score);
    return score;
    
  }
}

export const currentScore = JSON.parse(localStorage.getItem('score')) || 0

function saveToStorage(score) {
  localStorage.setItem('score', JSON.stringify(score));
}

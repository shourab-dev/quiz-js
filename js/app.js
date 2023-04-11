//* RULES

const totalQuestions = 2;
let current = 0;
let score = 0;

// * get user name

const popUp = document.querySelector(".popup");
const inputName = popUp.querySelector("input");
const inputNameForm = popUp.querySelector("form");
const inputNameButton = popUp.querySelector("button");

//* update profile
let profileImgUrl = `https://api.dicebear.com/6.x/avataaars/svg?eyes=happy&facialHair=beardLight,beardMedium&hairColor=2c1b18&mouth=smile&skinColor=ffdbb4&eyebrows=raisedExcited&top=dreads01,dreads02,shortCurly,shortWaved&radius=50&seed=`;
let profileImg = document.querySelector(".profileImg img");
let name = document.querySelector(".userName");

const updateProfile = (user) => {
  name.innerHTML = user;
  profileImg.src = profileImgUrl + user;
};

let userName = "User";
const getName = (e) => {
  e.preventDefault();
  userName = inputName.value ? inputName.value : "User";
  updateProfile(userName);
  inputNameButton.innerHTML = `Loading`;
  setTimeout(() => {
    popUp.classList.add("hide");
  }, 200);
};

inputNameForm.addEventListener("submit", getName);

//* SET QUESTIONS
const currentQuizNumber = document.querySelector(".current");
const totalQuizNumber = document.querySelector(".totalQuiz");
const question = document.querySelector(".content .question");
const answerBox = document.querySelector(".ansBox");
let currentCorrectAnswer = "";
const setQuestions = (data) => {
  currentQuizNumber.innerHTML = current;
  totalQuizNumber.innerHTML = totalQuestions;
  question.innerHTML = data.question;
  //* set correct ans
  currentCorrectAnswer = data.correctAnswer;
  let allAns = [...data.incorrectAnswers, data.correctAnswer];
  //* RANDOMIZE ANSWERS
  allAns.sort(() => Math.random() - 0.5);

  let allAnsArray = [];
  allAns.map((ans, index) => {
    let option = ` <div class="inputArea">
                        <input type="radio" id="ans${index}" name="quiz" value="${ans}">
                        <label for="ans${index}">
                           ${ans}
                        </label>
                    </div>`;
    allAnsArray.push(option);
  });

  answerBox.innerHTML = allAnsArray.join("");
};

//* GET QUESTIONS

let options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const getQuestion = async () => {
  let response = await fetch(
    "https://the-trivia-api.com/api/questions?categories=film_and_tv,food_and_drink&limit=1&difficulty=easy",
    options
  );

  let data = await response.json();
  console.log(data);
  setQuestions(data[0]);
};
if (current != totalQuestions && current < totalQuestions) {
  getQuestion();
}

//* UPDATE PROGRESS

const progressCnt = document.querySelector(".progressCnt");

const updateProgress = (current, totalLength) => {
  let percentage = (100 / totalLength) * current;
  progressCnt.style.width = `${percentage}%`;
  currentQuizNumber.innerHTML = current;
  totalQuizNumber.innerHTML = totalLength;
};

//* CHECK ANSWER
const form = document.querySelector("form.answerForm");
let totalScore = document.querySelector(".totalScore span");
const contentArea = document.querySelector(".content");

//* CHECK ANSWER AND RESET
const checkResult = (e) => {
  e.preventDefault();

  if (current < totalQuestions) {
    let userAns = e.target.querySelector('input[name="quiz"]:checked');
    if (current != totalQuestions && current < totalQuestions) {
      current += 1;
    }
    if (userAns.value == currentCorrectAnswer) {
      score += 1;
    }
    //* UPDATE RESULT FOR PROFILE
    totalScore.innerHTML = score;
    //*  UPDATE PROGRESSBAR
    updateProgress(current, totalQuestions);

    if (current < totalQuestions) {
      //* GET NEW QUESTIONS
      console.log(current);
      getQuestion();
    } else {
      current -= current;
      //* SHOW THE RESULT
      let totalScore = score;
      let totalScoreAve = Math.floor(score / totalQuestions);
      let reloadGame = ` <div class="resetGame">
                        <a href="#" onClick=" window.location.reload(); ">Restart Game</a>
                    </div>`;
      if (totalScore > totalScoreAve) {
        contentArea.innerHTML = `<h2>Excellent Job. You got ${totalScore} questions right 😀</h2> ${reloadGame}`;
      } else {
        contentArea.innerHTML = `<h2>Ohh!!!  You only got ${totalScore} questions right 😓</h2> ${reloadGame}`;
      }
    }
  }

  
};

form.addEventListener("submit", checkResult);

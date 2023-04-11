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
  userName = inputName.value;
  updateProfile(userName);
  inputNameButton.innerHTML = `Loading`;
  setTimeout(() => {
    popUp.classList.add("hide");
  }, 200);
};

inputNameForm.addEventListener("submit", getName);

//* SET QUESTIONS

const question = document.querySelector(".content .question");
const answerBox = document.querySelector(".ansBox");

const setQuestions = (data) => {
  question.innerHTML = data.question;
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
    let option2 = new DOMParser().parseFromString(option, "text/html");
  answerBox.appendChild(option2)
  });

  
};

//* GET QUESTIONS

const totalQuestions = 5;
let current = 1;

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

getQuestion();

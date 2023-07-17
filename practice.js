const result = document.getElementById("result");
let currentOperator = "";
let firstNumber = "";
let secondNumber = "";

function setNumber(number) {
  if (currentOperator && secondNumber) {
    result.innerHTML += number;
    secondNumber += number;
  } else if (!currentOperator) {
    if (result.innerHTML === "0") {
      firstNumber = number;
      result.innerHTML = number;
    } else {
      firstNumber += number;
      result.innerHTML += number;
    }
  } else {
    secondNumber = number;
    result.innerHTML = number;
  }
}

function setOperator(operator) {
  currentOperator = operator;
}

function resulting() {
  switch (currentOperator) {
    case "+":
      result.innerHTML = +firstNumber + +secondNumber;
      break;
    case "-":
      result.innerHTML = +firstNumber - +secondNumber;
      break;
    case "*":
      result.innerHTML = +firstNumber * +secondNumber;
      break;
    case "/":
      result.innerHTML = +firstNumber / +secondNumber;
      break;
    case "%":
      result.innerHTML = +(firstNumber * secondNumber) / 100;
      break;
  }
}

function clean() {
  result.innerHTML = 0;
  currentOperator = "";
  firstNumber = "";
  secondNumber = "";
}

const del = () => {
  const { textContent } = result;
  if (textContent.length > 0) {
    result.textContent = textContent.substr(0, textContent.length - 1);
  }
};

function updateTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;
  let timeString = hours + ":" + minutes + ":" + seconds;
  document.getElementById("time").textContent = timeString;
}
setInterval(updateTime, 1000);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case ".":
      setNumber(e.key);
      break;
    case "/":
    case "*":
    case "+":
    case "-":
    case "%":
      setOperator(e.key);
      break;
    case "Enter":
      resulting();
      break;
    case "Backspace":
      del();
      break;
    case "c":
      clean();
    default:
  }
});

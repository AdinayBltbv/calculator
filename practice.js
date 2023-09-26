// const result = document.getElementById("result");
// let currentOperator = "";
// let firstNumber = "";
// let secondNumber = "";

// function setNumber(number) {
//   if (currentOperator && secondNumber) {
//     result.innerHTML += number;
//     secondNumber += number;
//   } else if (!currentOperator) {
//     if (result.innerHTML === "0") {
//       firstNumber = number;
//       result.innerHTML = number;
//     } else {
//       firstNumber += number;
//       result.innerHTML += number;
//     }
//   } else {
//     secondNumber = number;
//     result.innerHTML = number;
//   }
// }

// function setOperator(operator) {
//   currentOperator = operator;
// }

// function resulting() {
//   switch (currentOperator) {
//     case "+":
//       result.innerHTML = +firstNumber + +secondNumber;
//       break;
//     case "-":
//       result.innerHTML = +firstNumber - +secondNumber;
//       break;
//     case "*":
//       result.innerHTML = +firstNumber * +secondNumber;
//       break;
//     case "/":
//       result.innerHTML = +firstNumber / +secondNumber;
//       break;
//     case "%":
//       result.innerHTML = +(firstNumber * secondNumber) / 100;
//       break;
//   }
// }

// function clean() {
//   result.innerHTML = 0;
//   currentOperator = "";
//   firstNumber = "";
//   secondNumber = "";
// }

// const del = () => {
//   const { textContent } = result;
//   if (textContent.length > 0) {
//     result.textContent = textContent.substr(0, textContent.length - 1);
//   }
// };

// function updateTime() {
//   let now = new Date();
//   let hours = now.getHours();
//   let minutes = now.getMinutes();
//   let seconds = now.getSeconds();
//   hours = (hours < 10 ? "0" : "") + hours;
//   minutes = (minutes < 10 ? "0" : "") + minutes;
//   seconds = (seconds < 10 ? "0" : "") + seconds;
//   let timeString = hours + ":" + minutes + ":" + seconds;
//   document.getElementById("time").textContent = timeString;
// }
// setInterval(updateTime, 1000);

// document.addEventListener("keydown", (e) => {
//   switch (e.key) {
//     case "1":
//     case "2":
//     case "3":
//     case "4":
//     case "5":
//     case "6":
//     case "7":
//     case "8":
//     case "9":
//     case "0":
//     case ".":
//       setNumber(e.key);
//       break;
//     case "/":
//     case "*":
//     case "+":
//     case "-":
//     case "%":
//       setOperator(e.key);
//       break;
//     case "Enter":
//       resulting();
//       break;
//     case "Backspace":
//       del();
//       break;
//     case "c":
//       clean();
//     default:
//   }
// });

const result = document.getElementById("result");
let expression = [];

function setNumber(number) {
  if (
    expression.length > 0 &&
    typeof expression[expression.length - 1] === "number"
  ) {
    if (expression[expression.length - 1].toString().length >= 9) {
      return;
    }

    expression[expression.length - 1] = parseFloat(
      expression[expression.length - 1].toString() + number
    );
    result.textContent = expression[expression.length - 1];
  } else {
    expression.push(parseFloat(number));
    result.textContent = number;
  }
}

function setOperator(operator) {
  if (
    expression.length > 0 &&
    typeof expression[expression.length - 1] === "number"
  ) {
    expression.push(operator);
  } else if (
    expression.length > 0 &&
    typeof expression[expression.length - 1] === "string"
  ) {
    expression[expression.length - 1] = operator;
  }
}

function calculate() {
  if (
    expression.length < 3 ||
    typeof expression[expression.length - 1] === "string"
  ) {
    return;
  }

  let resultValue = expression[0];
  for (let i = 1; i < expression.length; i += 2) {
    const operator = expression[i];
    const operand = expression[i + 1];
    switch (operator) {
      case "+":
        resultValue += operand;
        break;
      case "-":
        resultValue -= operand;
        break;
      case "*":
        resultValue *= operand;
        break;
      case "/":
        resultValue /= operand;
        break;
      case "%":
        resultValue = (resultValue * operand) / 100;
        break;
    }
  }

  expression = [resultValue];
  result.textContent = resultValue;
}

function resulting() {
  calculate();
}

function clean() {
  expression = [];
  result.textContent = "0";
}

const del = () => {
  if (expression.length > 0) {
    const lastElement = expression[expression.length - 1];
    if (typeof lastElement === "number") {
      expression[expression.length - 1] = parseFloat(
        lastElement.toString().slice(0, -1)
      );
      result.textContent = expression[expression.length - 1];
    } else if (typeof lastElement === "string") {
      expression.pop();
    }

    if (expression.length === 0) {
      result.textContent = "0";
    }
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
      break;
    default:
  }

  if (
    e.key === "/" ||
    e.key === "*" ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "Enter"
  ) {
    calculate();
  }
});

document.getElementById("toggleSign").addEventListener("click", toggleSign);

function toggleSign() {
  if (
    expression.length > 0 &&
    typeof expression[expression.length - 1] === "number"
  ) {
    expression[expression.length - 1] = -expression[expression.length - 1];
    result.textContent = expression[expression.length - 1];
  }
}
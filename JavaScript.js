"use strict";

const root = document.querySelector("html");
const btnmenu = document.querySelector(".menu");
const texthistory = document.querySelector(".text-history");
const historyEl = document.querySelector("#history-elements");

// themeable
btnmenu.addEventListener("click", function () {
  if (root.getAttribute("data-theme") === "defult") {
    root.setAttribute("data-theme", "green");
  } else if (root.getAttribute("data-theme") === "green") {
    root.setAttribute("data-theme", "blue");
  } else if (root.getAttribute("data-theme") === "blue") {
    root.setAttribute("data-theme", "purple");
  } else if (root.getAttribute("data-theme") === "purple") {
    root.setAttribute("data-theme", "defult");
  }
});

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
      this.computeSpecial();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "percent":
        computation = prev % current;
        break;
      case "radical":
        computation = Math.sqrt(current);
        break;
      case onedividex:
        computation = 1 / current;
        break;
      case power2:
        computation = Math.pow(prev, 2);
        break;
      case power3:
        computation = Math.pow(prev, 3);
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  computeSpecial() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    switch (this.operation) {
      case "percent":
        computation = prev % current;
        break;
      case "radical":
        computation = Math.sqrt(current);
        break;
      case "onedividex":
        computation = 1 / current;
        console.log(this);
        break;
      case "power2":
        computation = Math.pow(current, 2);
        break;
      case "power3":
        computation = Math.pow(current, 3);
        break;
      case "data-plasminus":
        computation = Math.abs(current);
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }

  updateDisplaySpecial() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    switch (this.previousOperandTextElement) {
      case "percent":
        break;
      case "radical":
        previousOperandTextElement.innerText = `√(${current})`;
        break;
      case "onedividex":
        computation = 1 / current;
        console.log(this);
        break;
      case "power2":
        computation = Math.pow(current, 2);
        break;
      case "power3":
        computation = Math.pow(current, 3);
        break;
      case "data-plasminus":
        computation = Math.abs(current);
        break;
      default:
        return;
    }
    // this.currentOperandTextElement.innerText = this.getDisplayNumber(
    //   this.currentOperand
    // );
    // if (this.operation != null) {
    //   this.previousOperandTextElement.innerText = `${
    //     this.operation
    //   } ${this.getDisplayNumber(this.previousOperand)}`;
    //   // this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
    //   //   this.previousOperand
    //   // )} ${this.operation}`;
    // } else {
    //   this.previousOperandTextElement.innerText = "";
  }

  // if (this.operation != null) {
  //   this.previousOperandTextElement.innerText = `${
  //     this.operation
  //   } ${this.getDisplayNumber(this.previousOperand)}`;
  //   // this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
  //   //   this.previousOperand
  //   // )} ${this.operation}`;
  // } else {
  //   this.previousOperandTextElement.innerText = "";
  // }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const percentButton = document.querySelector("[data-perecent]");
const radicalButton = document.querySelector("[data-radical]");
const onedividexButton = document.querySelector("[data-onedividex]");
const power2Button = document.querySelector("[data-power2]");
const power3Button = document.querySelector("[data-power3]");
const plasminusButton = document.querySelector("data-plasminus");

const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// percentButton.addEventListener("click", () => {
//   calculator.updateDisplay();
// });

radicalButton.addEventListener("click", () => {
  calculator.operation = "radical";
  calculator.computeSpecial();
  calculator.updateDisplay();
});

onedividexButton.addEventListener("click", () => {
  calculator.operation = "onedividex";
  calculator.computeSpecial();
  calculator.updateDisplay();
});

power2Button.addEventListener("click", () => {
  calculator.operation = "power2";
  calculator.computeSpecial();
  calculator.updateDisplay();
});

power3Button.addEventListener("click", () => {
  calculator.operation = "power3";
  calculator.computeSpecial();
  calculator.updateDisplay();
});

plasminusButton.addEventListener("click", () => {
  calculator.operation = "data-plasminus";
  calculator.computeSpecial();
  calculator.updateDisplay();
});

////////////////////////////////////////////////////////

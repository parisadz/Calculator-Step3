"use strict";
class Calculator {
  constructor(
    displayValue,
    firstNumber,
    interruption,
    operator,
    expression,
    prevOp,
    prevNumber
  ) {
    this.displayValue = displayValue;
    this.firstNumber = firstNumber;
    this.interruption = interruption;
    this.operator = operator;
    this.expression = expression;
    this.prevOp = prevOp;
    this.prevNumber = prevNumber;
  }
  // ------------------------------input numbers and operators------------------------------
  inputNumbers = (number) => {
    this.prevNumber = null;
    const displayValue = this.displayValue;
    const interruption = this.interruption;
    if (interruption === true) {
      this.displayValue = number;
      this.interruption = false;
    } else {
      this.displayValue = displayValue == "0" ? number : displayValue + number;
    }
  };

  inputOperators = (operators) => {
    const firstNumber = this.firstNumber;
    const operator = this.operator;
    const realValue = parseFloat(this.displayValue);
    if (operators == "=" && this.firstNumber && operator != "=") {
      const result = this.basicOperators(firstNumber, realValue, operator);
      if (result) {
        this.addToHistory(true);
      }
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      document.getElementById(
        "previousNumber"
      ).innerHTML = `${this.firstNumber} ${operator} ${realValue} ${operators}`;
      this.interruption = false;
    } else if (operators != "=" && this.displayValue != 0 && !this.expression) {
      if (!(operator && this.interruption)) {
        const prevText = document.getElementById("previousNumber");
        prevText.innerHTML += `${this.displayValue} ${operators}`;
      } else {
        const prevText = document.getElementById("previousNumber");
        prevText.innerHTML = `${this.displayValue} ${operators}`;
      }
      this.expression = false;
    } else if (operators == "=" && this.operator == "=" && this.prevNumber) {
      const result = this.basicOperators(
        realValue,
        this.prevNumber,
        this.prevOp
      );
      if (result) {
        this.addToHistory(false);
      }
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      document.getElementById("previousNumber").innerHTML = "";
      this.interruption = true;
      return;
    } else if (this.prevNumber) {
      document.getElementById(
        "previousNumber"
      ).innerHTML = `${this.firstNumber} ${operators} `;
      this.prevNumber = null;
    }

    if (operator && this.interruption) {
      this.operator = operators;
      return;
    }

    if (firstNumber == null && !isNaN(realValue)) {
      this.firstNumber = realValue;
    } else if (operator) {
      const result = this.basicOperators(firstNumber, realValue, operator);
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      this.firstNumber = result;
    }
    this.interruption = true;
    this.operator = operators;
  };

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
  // ------------------------------add to history------------------------------
  addToHistory = (bool) => {
    document.querySelector(".text-history").style.display = "none";
    const historyElem = document.getElementById("history-elements");
    const contDiv = document.createElement("div");
    contDiv.className = "history-container-div";
    if (historyElem.childNodes.length > 3) {
      historyElem.insertBefore(contDiv, historyElem.firstChild);
    } else {
      historyElem.appendChild(contDiv);
      const trashCanDiv = document.createElement("div");
      trashCanDiv.className = "trash-div";
      historyElem.appendChild(trashCanDiv);
      const trashCan = document.createElement("img");
      trashCan.className = "trash-main";
      trashCan.src = "https://img.icons8.com/ios/50/000000/trash--v1.png";
      trashCanDiv.appendChild(trashCan);
    }
    // ------------------------------create element p / node / para-add / para-result / node-result / delete-history------------------------------
    const para = document.createElement("p");
    if (this.expression) {
      const node = document.createTextNode(
        `${document.getElementById("previousNumber").innerHTML} =`
      );
      para.appendChild(node);
      this.expression = false;
    } else if (bool) {
      const node = document.createTextNode(
        `${document.getElementById("previousNumber").innerHTML} ${
          this.displayValue
        } =`
      );
      para.appendChild(node);
    } else {
      const node = document.createTextNode(
        `${this.displayValue} ${this.prevOp} ${this.prevNumber} =`
      );
      para.appendChild(node);
    }
    para.className = "para-add";
    contDiv.appendChild(para);

    const paraResult = document.createElement("div");
    if (bool) {
      const nodeResult = document.createTextNode(
        `${parseFloat(
          this.basicOperators(
            parseFloat(this.firstNumber),
            parseFloat(this.displayValue),
            this.operator
          ).toFixed(7)
        )}`
      );
      paraResult.appendChild(nodeResult);
    } else {
      const nodeResult = document.createTextNode(
        `${parseFloat(
          this.basicOperators(
            parseFloat(this.displayValue),
            this.prevNumber,
            this.prevOp
          ).toFixed(7)
        )}`
      );
      paraResult.appendChild(nodeResult);
    }
    paraResult.className = "result-add";
    contDiv.appendChild(paraResult);

    const deleteHistory = document.createElement("div");
    deleteHistory.className = "delete-history";
    contDiv.appendChild(deleteHistory);
    const trashIcon = document.createElement("img");
    trashIcon.src = "https://img.icons8.com/ios/20/000000/delete--v2.png";
    deleteHistory.appendChild(trashIcon);
  };
  // ------------------------------function decimal / percent / clear / currentClear / delete------------------------------
  inputDot = (decimal) => {
    if (this.interruption === true) {
      this.displayValue = "0.";
      this.interruption = false;
      return;
    }
    if (!this.displayValue.includes(decimal)) {
      this.displayValue += decimal;
    }
  };

  percentage = () => {
    if (this.interruption === false) {
      let number = this.displayValue;
      number = this.firstNumber * (this.displayValue / 100);
      number = parseFloat(number.toFixed(7));
      this.displayValue = number;
      return;
    } else {
      this.clear();
    }
  };

  clear = () => {
    this.displayValue = 0;
    this.firstNumber = null;
    this.interruption = false;
    this.operator = null;
    document.getElementById("previousNumber").innerHTML = "";
    this.expression = null;
    this.prevOp = null;
    this.prevNumber = null;
  };

  currentClear = () => {
    this.displayValue = 0;
  };

  delete = () => {
    const length = this.displayValue.length - 1;
    if (length == 0) {
      this.displayValue = 0;
      this.displayUpdate();
    } else {
      const slicer = this.displayValue;
      this.displayValue = slicer.slice(0, length);
    }
  };
  // ------------------------------function spicial operators------------------------------
  specialOperators = (action) => {
    let number = this.displayValue;
    switch (action) {
      case "square":
        if (number > 1) {
          number = Math.sqrt(number);
          document.getElementById(
            "previousNumber"
          ).innerHTML = `√(${this.displayValue})`;
          this.displayValue = parseFloat(number.toFixed(7));
          this.firstNumber = parseFloat(number.toFixed(7));
          this.expression = true;
          return;
        } else {
          alert(
            "❌(√) for negative numbers, zero and less than zero is not allowed.❌"
          );
          this.clear();
          return;
        }
      case "pow2":
        number = Math.pow(number, 2);
        document.getElementById(
          "previousNumber"
        ).innerHTML = `sqr(${this.displayValue})`;
        this.displayValue = parseFloat(number.toFixed(7));
        this.firstNumber = parseFloat(number.toFixed(7));
        this.expression = true;
        return;
      case "pow3":
        number = Math.pow(number, 3);
        document.getElementById(
          "previousNumber"
        ).innerHTML = `cube(${this.displayValue})`;
        this.displayValue = parseFloat(number.toFixed(7));
        this.firstNumber = parseFloat(number.toFixed(7));
        this.expression = true;
        return;
      case "1/x":
        if (number == 0) {
          alert("❌You cannot divide one divided by zero.❌");
          this.clear();
          return;
        } else {
          number = 1 / number;
          document.getElementById(
            "previousNumber"
          ).innerHTML = `1/(${this.displayValue})`;
          this.displayValue = parseFloat(number.toFixed(7));
          this.firstNumber = parseFloat(number.toFixed(7));
          this.expression = true;
          return;
        }
      case "plus-minus":
        if (number > 0) {
          number = -Math.abs(number);
        } else {
          number = Math.abs(number);
        }
        this.displayValue = parseFloat(number.toFixed(7));
        this.firstNumber = parseFloat(number.toFixed(7));
        return;
    }
  };
  // ------------------------------function spicial operators------------------------------
  basicOperators = (firstNumber, secondNumber, operator) => {
    switch (operator) {
      case "÷":
        if (!isFinite(firstNumber / secondNumber)) {
          alert("cannot divide to zero");
          this.clear();
          return;
        }
        if (!this.prevNumber) {
          this.prevNumber = secondNumber;
        }
        this.prevOp = "÷";
        return firstNumber / secondNumber;
      case "×":
        this.prevOp = "×";
        if (!this.prevNumber) {
          this.prevNumber = secondNumber;
        }
        return firstNumber * secondNumber;
      case "-":
        this.prevOp = "-";
        if (!this.prevNumber) {
          this.prevNumber = secondNumber;
        }
        return firstNumber - secondNumber;
      case "+":
        this.prevOp = "+";
        if (!this.prevNumber) {
          this.prevNumber = secondNumber;
        }
        return firstNumber + secondNumber;
    }
    return secondNumber;
  };
  // ------------------------------update the display------------------------------
  displayUpdate = () => {
    const display = document.querySelector(".currentNumber");
    display.value = this.getDisplayNumber(this.displayValue);
  };
  // ------------------------------which buttons is clicked------------------------------
  buttonClicked = (e) => {
    const target = e.target;
    if (!target.matches("button")) {
      return;
    }
    if (target.classList.contains("operations")) {
      this.inputOperators(target.value);
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("percentage")) {
      this.percentage();
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("radical")) {
      this.specialOperators("square");
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("x2")) {
      this.specialOperators("pow2");
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("x3")) {
      this.specialOperators("pow3");
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("1/x")) {
      this.specialOperators("1/x");
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("plus-minus")) {
      this.specialOperators("plus-minus");
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("decimal")) {
      this.inputDot(target.value);
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("currentClear")) {
      this.currentClear();
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("clear")) {
      this.clear();
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("delete")) {
      this.delete();
      this.displayUpdate();
      return;
    }
    this.inputNumbers(target.value);
    this.displayUpdate();
  };
}
const calculator = new Calculator("0", null, false, null, false, null, null);

const buttons = document.querySelector("#buttons");
buttons.addEventListener("click", calculator.buttonClicked);
calculator.displayUpdate();

function myFunction2() {
  document.querySelector(".memory-save").style.display = "none !important";
  document.querySelector(".history-save").style.display = "none !important";
}
let x = window.matchMedia("(max-width: 500px)");
x.addEventListener("change", myFunction2);

var currentNumberElem = document.getElementById("currentNumber");
currentNumberElem.focus();
currentNumberElem.scrollLeft = currentNumberElem.scrollWidth;
// ------------------------------history and memory------------------------------
const memory = document.querySelector(".memory");
const history = document.querySelector(".his");

const memoryFunction = () => {
  memory.style.borderBottom = "3px solid orange";
  memory.style.paddingBottom = "3px";
  history.style.border = "none";
  history.style.padding = "0";
  document.querySelector(".memory-save").style.display = "block";
};

const historyFunction = () => {
  history.style.borderBottom = "3px solid orange";
  history.style.paddingBottom = "3px";
  memory.style.border = "none";
  memory.style.padding = "0";
  document.querySelector(".memory-save").style.display = "none";
};

memory.addEventListener("click", memoryFunction);
history.addEventListener("click", historyFunction);

const showHistory = () => {
  const hiddenHistory = document.querySelector(".lower-history");
  hiddenHistory.classList.add("hidden-history");
  let number = 10;
  number = document.querySelector(".memory-save").style.zIndex;
  if (hiddenHistory.style.zIndex > 0) {
    hiddenHistory.style.zIndex = -1;
  } else {
    hiddenHistory.style.display = "block";
    if (number != -1) {
      hiddenHistory.style.zIndex = number + 1;
    } else {
      hiddenHistory.style.zIndex = 10;
    }
  }
};

const showHiddenMemory = () => {
  const diactive1 = document.querySelector(".diactive1");
  const diactive2 = document.querySelector(".diactive2");
  const active1 = document.querySelector(".active1");
  const active2 = document.querySelector(".active2");
  const active3 = document.querySelector(".active3");
  let z_index = 1;
  z_index = document.querySelector(".lower-history").style.zIndex;
  const hiddenMemory = document.querySelector(".memory-save");
  hiddenMemory.classList.add("hidden-memory");

  if (hiddenMemory.style.zIndex > 0) {
    diactive1.disabled = false;
    diactive2.disabled = false;
    active1.disabled = false;
    active2.disabled = false;
    active3.disabled = false;
    hiddenMemory.style.zIndex = -1;
  } else {
    diactive1.disabled = true;
    diactive2.disabled = true;
    active1.disabled = true;
    active2.disabled = true;
    active3.disabled = true;
    hiddenMemory.style.display = "block";
    if (z_index != -1) {
      hiddenMemory.style.zIndex = z_index + 1;
    } else {
      hiddenMemory.style.zIndex = 10;
    }
  }
};
// ------------------------------delete history-----------------------------
const historyElement = document.getElementById("history-elements");
historyElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-history")) {
    e.target.parentNode.remove();
    if (historyElement.childNodes.length < 5) {
      document.querySelector(".text-history").style.display = "block";
      document.querySelector(".trash-main").parentNode.remove();
    }
  }
  if (e.target.classList.contains("trash-div")) {
    if (historyElement.childNodes.length > 3) {
      const historyQuery = document.querySelectorAll(".history-container-div");
      historyQuery.forEach((element) => {
        element.remove();
      });
    }
    e.target.remove();
    document.querySelector(".text-history").style.display = "block";
  }
});
// ------------------------------save memory-----------------------------
const createMemoryElement = () => {
  const memory = document.querySelector(".memory-save");

  const contMem = document.createElement("div");
  contMem.className = "memory-container-div";
  if (memory.childNodes.length > 3) {
    memory.insertBefore(contMem, memory.firstChild);
  } else {
    memory.appendChild(contMem);
  }

  const memoryPara = document.createElement("p");
  memoryPara.className = "memory-div-result";
  memoryPara.innerHTML = calculator.displayValue;
  contMem.appendChild(memoryPara);

  const contDiv = document.createElement("div");
  contDiv.className = "memory-div";
  contMem.appendChild(contDiv);

  const smallButtons1 = document.createElement("button");
  smallButtons1.className = "memory-btn-Mdelete";
  smallButtons1.innerHTML = "MC";
  contDiv.appendChild(smallButtons1);

  const smallButtons2 = document.createElement("button");
  smallButtons2.className = "memory-btn-Mplus";
  smallButtons2.innerHTML = "M+";
  contDiv.appendChild(smallButtons2);

  const smallButtons3 = document.createElement("button");
  smallButtons3.className = "memory-btn-Mminus";
  smallButtons3.innerHTML = "M-";
  contDiv.appendChild(smallButtons3);
};

const saveMemory = () => {
  document.querySelector(".text-memory").style.display = "none";
  createMemoryElement();
  const diactive1 = document.querySelector(".diactive1");
  const diactive2 = document.querySelector(".diactive2");
  const extera = document.querySelector(".extera");
  extera.disabled = false;
  diactive1.disabled = false;
  diactive1.classList.add("on");
  extera.classList.add("on");
  diactive2.disabled = false;
  diactive2.classList.add("on");
};
// ------------------------------clear history and memory------------------------------
const clearHistory = () => {
  const saved = document.querySelector(".memory-save");
  if (saved.childNodes.length > 3) {
    const saveQuery = document.querySelectorAll(".memory-container-div");
    let i = 0;
    saveQuery.forEach((element) => {
      element.remove();
    });
  }
  document.querySelector(".text-memory").style.display = "block";
};

const clearMemory = () => {
  const saved = document.querySelector(".memory-save");
  if (saved.childNodes.length > 3) {
    const saveQuery = document.querySelectorAll(".memory-container-div");
    let i = 0;
    saveQuery.forEach((element) => {
      element.remove();
    });
  }
  document.querySelector(".text-memory").style.display = "block";
  const diactive1 = document.querySelector(".diactive1");
  const diactive2 = document.querySelector(".diactive2");
  const extera = document.querySelector(".extera");
  extera.disabled = true;
  diactive1.disabled = true;
  diactive1.classList.remove("on");
  extera.classList.remove("on");
  diactive2.disabled = true;
  diactive2.classList.remove("on");
};
// ------------------------------small buttons in memory------------------------------
const plusMemory = () => {
  const savedNodes = document.querySelector(".memory-save");
  const memoryDivs = document.querySelectorAll(".memory-container-div");
  if (savedNodes.childNodes.length > 3) {
    let selected = memoryDivs[0].querySelector(".memory-div-result");
    selected.innerHTML =
      parseFloat(calculator.displayValue) + parseFloat(selected.innerHTML);
  } else {
    saveMemory();
  }
};

const minusMemory = () => {
  const savedNodes = document.querySelector(".memory-save");
  const memoryDivs = document.querySelectorAll(".memory-container-div");
  if (savedNodes.childNodes.length > 3) {
    let selected = memoryDivs[0].querySelector(".memory-div-result");
    selected.innerHTML =
      parseFloat(selected.innerHTML) - parseFloat(calculator.displayValue);
  } else {
    saveMemory();
  }
};

const memoryRecall = () => {
  const memoryDivs = document.querySelectorAll(".memory-container-div");
  let selected = memoryDivs[0].querySelector(".memory-div-result");
  calculator.displayValue = parseFloat(selected.innerHTML);
  document.getElementById("currentNumber").value = parseFloat(
    selected.innerHTML
  );
};

const OneMemory = (e) => {
  if (e.target.classList.contains("memory-btn-Mdelete")) {
    e.target.parentNode.parentNode.remove();
    if (document.querySelector(".memory-save").childNodes.length < 4) {
      document.querySelector(".text-memory").style.display = "block";
      document.querySelector(".text-memory").style.display = "block";
      const diactive1 = document.querySelector(".diactive1");
      const diactive2 = document.querySelector(".diactive2");
      diactive1.disabled = true;
      diactive1.classList.remove("on");
      diactive2.disabled = true;
      diactive2.classList.remove("on");
    }
  }
  if (e.target.classList.contains("memory-btn-Mplus")) {
    const newValue =
      e.target.parentNode.parentNode.querySelector(".memory-div-result");
    newValue.innerHTML =
      parseFloat(calculator.displayValue) + parseFloat(newValue.innerHTML);
  }
  if (e.target.classList.contains("memory-btn-Mminus")) {
    const newValue2 =
      e.target.parentNode.parentNode.querySelector(".memory-div-result");
    newValue2.innerHTML =
      parseFloat(newValue2.innerHTML) - parseFloat(calculator.displayValue);
  }
};

const memorySave = document.querySelector(".memory-save");
memorySave.addEventListener("click", OneMemory);
// ------------------------------right click for delete------------------------------
let menu = null;
document.addEventListener("DOMContentLoaded", function () {
  menu = document.querySelector(".menu");
  menu.classList.add("off");

  let HisContDiv = document.querySelector(".history-container-div");
  HisContDiv.addEventListener("div", showMenu);

  menu.addEventListener("mouseleave", hideMenu);

  addMenuListeners();
});

function addMenuListeners() {
  document
    .getElementById("delete-item")
    .addEventListener("click", deleteHistory);
}

function showMenu(e) {
  e.preventDefault();
  console.log(ev.clientX, ev.clientY);
  menu.style.top = `${e.clientY - 20}px`;
  menu.style.left = `${e.clientX - 20}px`;
  menu.classList.remove("off");
}

function hideMenu(e) {
  menu.classList.add("off");
  menu.style.top = "-200%";
  menu.style.left = "-200%";
}

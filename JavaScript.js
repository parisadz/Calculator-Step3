"use strict";
class Calculator {
  constructor(
    displayValue,
    firstNumber,
    waitingForSecondNumber,
    operator,
    expression,
    prevOp,
    prevNumber
  ) {
    this.displayValue = displayValue;
    this.firstNumber = firstNumber;
    this.waitingForSecondNumber = waitingForSecondNumber;
    this.operator = operator;
    this.expression = expression;
    this.prevOp = prevOp;
    this.prevNumber = prevNumber;
  }

  inputNumbers = (number) => {
    this.prevNumber = null;
    const displayValue = this.displayValue;
    const waitingForSecondNumber = this.waitingForSecondNumber;
    if (waitingForSecondNumber === true) {
      this.displayValue = number;
      this.waitingForSecondNumber = false;
    } else {
      this.displayValue = displayValue == "0" ? number : displayValue + number;
    }
  };

  inputOperators = (comingOperator) => {
    const firstNumber = this.firstNumber;
    const operator = this.operator;
    const realValue = parseFloat(this.displayValue);
    if (comingOperator == "=" && this.firstNumber && operator != "=") {
      const result = this.finalResult(firstNumber, realValue, operator);
      if (result) {
        this.appendHistory(true);
      }
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      document.getElementById("previousText").innerHTML = "";
      this.waitingForSecondNumber = false;
    } else if (
      comingOperator != "=" &&
      this.displayValue != 0 &&
      !this.expression
    ) {
      if (!(operator && this.waitingForSecondNumber)) {
        const prevText = document.getElementById("previousText");
        prevText.innerHTML += `${this.displayValue} ${comingOperator} `;
      } else {
        const prevText = document.getElementById("previousText");
        prevText.innerHTML = `${this.displayValue} ${comingOperator} `;
      }
      this.expression = false;
    } else if (
      comingOperator == "=" &&
      this.operator == "=" &&
      this.prevNumber
    ) {
      const result = this.finalResult(realValue, this.prevNumber, this.prevOp);
      if (result) {
        this.appendHistory(false);
      }
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      document.getElementById("previousText").innerHTML = "";
      this.waitingForSecondNumber = true;
      return;
    } else if (this.prevNumber) {
      document.getElementById(
        "previousText"
      ).innerHTML = `${this.firstNumber} ${comingOperator}`;
      this.prevNumber = null;
    }

    if (operator && this.waitingForSecondNumber) {
      this.operator = comingOperator;
      return;
    }

    if (firstNumber == null && !isNaN(realValue)) {
      this.firstNumber = realValue;
    } else if (operator) {
      const result = this.finalResult(firstNumber, realValue, operator);
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      this.firstNumber = result;
    }
    this.waitingForSecondNumber = true;
    this.operator = comingOperator;
  };

  appendHistory = (bool) => {
    document.querySelector(".text-history").style.cssText = "display: none;";
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

    const para = document.createElement("p");
    if (this.expression) {
      const node = document.createTextNode(
        `${document.getElementById("previousText").innerHTML} =`
      );
      para.appendChild(node);
      this.expression = false;
    } else if (bool) {
      const node = document.createTextNode(
        `${document.getElementById("previousText").innerHTML} ${
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
          this.finalResult(
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
          this.finalResult(
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

    const deleteSqr = document.createElement("div");
    deleteSqr.className = "delete-history";
    contDiv.appendChild(deleteSqr);
    const trashIcon = document.createElement("img");
    trashIcon.src = "https://img.icons8.com/ios/20/000000/delete--v2.png";
    deleteSqr.appendChild(trashIcon);
  };

  inputDot = (decimal) => {
    if (this.waitingForSecondNumber === true) {
      this.displayValue = "0.";
      this.waitingForSecondNumber = false;
      return;
    }
    if (!this.displayValue.includes(decimal)) {
      this.displayValue += decimal;
    }
  };

  percentage = () => {
    if (this.waitingForSecondNumber === false) {
      let number = this.displayValue;
      number = this.firstNumber * (this.displayValue / 100);
      number = parseFloat(number.toFixed(7));
      this.displayValue = number;
      return;
    } else {
      this.fullClear();
    }
  };

  fullClear = () => {
    this.displayValue = 0;
    this.firstNumber = null;
    this.waitingForSecondNumber = false;
    this.operator = null;
    document.getElementById("previousText").innerHTML = "";
    this.expression = null;
    this.prevOp = null;
    this.prevNumber = null;
  };

  lineClear = () => {
    this.displayValue = 0;
  };

  singleClear = () => {
    const length = this.displayValue.length - 1;
    if (length == 0) {
      this.displayValue = 0;
      this.displayUpdate();
    } else {
      const slicer = this.displayValue;
      this.displayValue = slicer.slice(0, length);
    }
  };

  specialButtons = (action) => {
    let number = this.displayValue;
    switch (action) {
      case "root":
        if (number > 1) {
          number = Math.sqrt(number);
          document.getElementById("previousText").innerHTML =
            "&#8730" + " " + "(" + this.displayValue + ")";
          this.displayValue = parseFloat(number.toFixed(7));
          this.firstNumber = parseFloat(number.toFixed(7));
          this.expression = true;
          return;
        } else {
          alert("√ for negative numbers is not allowed");
          this.fullClear();
          return;
        }
      case "pow2":
        number = Math.pow(number, 2);
        document.getElementById("previousText").innerHTML =
          "sqr (" + this.displayValue + ")";
        this.displayValue = parseFloat(number.toFixed(7));
        this.firstNumber = parseFloat(number.toFixed(7));
        this.expression = true;
        return;
      case "pow3":
        number = Math.pow(number, 3);
        document.getElementById("previousText").innerHTML =
          "cube (" + this.displayValue + ")";
        this.displayValue = parseFloat(number.toFixed(7));
        this.firstNumber = parseFloat(number.toFixed(7));
        this.expression = true;
        return;
      case "1/x":
        if (number == 0) {
          alert("cannot divide number to zero");
          this.fullClear();
          return;
        } else {
          number = 1 / number;
          document.getElementById("previousText").innerHTML =
            "1/(" + this.displayValue + ")";
          this.displayValue = parseFloat(number.toFixed(7));
          this.firstNumber = parseFloat(number.toFixed(7));
          this.expression = true;
          return;
        }
      case "p/m":
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

  finalResult = (firstNumber, secondNumber, operator) => {
    switch (operator) {
      case "+":
        this.prevOp = "+";
        if (!this.prevNumber) {
          this.prevNumber = secondNumber;
        }
        return firstNumber + secondNumber;
      case "-":
        this.prevOp = "-";
        if (!this.prevNumber) {
          this.prevNumber = secondNumber;
        }
        return firstNumber - secondNumber;
      case "*":
        this.prevOp = "*";
        if (!this.prevNumber) {
          this.prevNumber = secondNumber;
        }
        return firstNumber * secondNumber;
      case "/":
        if (!isFinite(firstNumber / secondNumber)) {
          alert("cannot divide to zero");
          this.fullClear();
          return;
        }
        if (!this.prevNumber) {
          this.prevNumber = secondNumber;
        }
        this.prevOp = "/";
        return firstNumber / secondNumber;
    }
    return secondNumber;
  };

  displayUpdate = () => {
    const display = document.querySelector(".currentText");
    display.value = this.displayValue;
  };

  findButton = (event) => {
    const target = event.target;
    if (!target.matches("button")) {
      return;
    }
    if (target.classList.contains("operations")) {
      this.inputOperators(target.value);
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("decimal")) {
      this.inputDot(target.value);
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("clear")) {
      this.fullClear();
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("percentage")) {
      this.percentage();
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("single-clear")) {
      this.singleClear();
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("line-clear")) {
      this.lineClear();
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("radical")) {
      this.specialButtons("root");
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("x2")) {
      this.specialButtons("pow2");
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("x3")) {
      this.specialButtons("pow3");
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("1/x")) {
      this.specialButtons("1/x");
      this.displayUpdate();
      return;
    }
    if (target.classList.contains("p/m")) {
      this.specialButtons("p/m");
      this.displayUpdate();
      return;
    }
    this.inputNumbers(target.value);
    this.displayUpdate();
  };
}
const calculator = new Calculator("0", null, false, null, false, null, null);

const buttons = document.querySelector("#buttons");
buttons.addEventListener("click", calculator.findButton);
calculator.displayUpdate();

function myFunction2() {
  document.querySelector(".memory-save").style.cssText =
    "display: 'none !important';";
  document.querySelector(".history-save").style.cssText =
    "display: 'none !important';";
}
let x = window.matchMedia("(max-width: 500px)");
x.addEventListener("change", myFunction2);

// overflow-------------------------------

var elem = document.getElementById("currentText");
elem.focus();
elem.scrollLeft = elem.scrollWidth;

// --------------------------------------------------------------------
// history and memory part

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
//----------- delete history--------------
const historyElement = document.getElementById("history-elements");
historyElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-history")) {
    event.target.parentNode.remove();
    if (historyElement.childNodes.length < 5) {
      document.querySelector(".text-history").style.cssText = "display: block;";
      document.querySelector(".trash-main").parentNode.remove();
    }
  }
  if (event.target.classList.contains("trash-div")) {
    if (historyElement.childNodes.length > 3) {
      const historyQuery = document.querySelectorAll(".history-container-div");
      historyQuery.forEach((element) => {
        element.remove();
      });
    }
    event.target.remove();
    document.querySelector(".text-history").style.cssText = "display: block;";
  }
});

//--------------------- save memory----------------
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
  smallButtons1.className = "memorory-btn-Mdelete";
  smallButtons1.innerHTML = "MC";
  contDiv.appendChild(smallButtons1);

  const smallButtons2 = document.createElement("button");
  smallButtons2.className = "memorory-btn-Mplus";
  smallButtons2.innerHTML = "M+";
  contDiv.appendChild(smallButtons2);

  const smallButtons3 = document.createElement("button");
  smallButtons3.className = "memorory-btn-Mminus";
  smallButtons3.innerHTML = "M-";
  contDiv.appendChild(smallButtons3);
};

const saveMemory = () => {
  document.querySelector(".text-memory").style.cssText = "display: none;";
  createMemoryElement();
  const off1 = document.querySelector(".off1");
  const off2 = document.querySelector(".off2");
  const sn = document.querySelector(".sn");
  sn.disabled = false;
  off1.disabled = false;
  off1.classList.add("on");
  sn.classList.add("on");
  off2.disabled = false;
  off2.classList.add("on");
};

const clearHistory = () => {
  const saved = document.querySelector(".memory-save");
  if (saved.childNodes.length > 3) {
    const saveQuery = document.querySelectorAll(".memory-container-div");
    let i = 0;
    saveQuery.forEach((element) => {
      element.remove();
    });
  }
  document.querySelector(".text-memory").style.cssText = "display: block;";
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
  document.querySelector(".text-memory").style.cssText = "display: block;";
  const off1 = document.querySelector(".off1");
  const off2 = document.querySelector(".off2");
  const sn = document.querySelector(".sn");
  sn.disabled = true;
  off1.disabled = true;
  off1.classList.remove("on");
  sn.classList.remove("on");
  off2.disabled = true;
  off2.classList.remove("on");
};

const plusMemory = () => {
  const memoryDivs = document.querySelectorAll(".memory-container-div");
  const savedNodes = document.querySelector(".memory-save");
  if (savedNodes.childNodes.length > 3) {
    let selected = memoryDivs[0].querySelector(".memory-div-result");
    selected.innerHTML =
      parseFloat(calculator.displayValue) + parseFloat(selected.innerHTML);
  } else {
    saveMemory();
  }
};

const minusMemory = () => {
  const memoryDivs = document.querySelectorAll(".memory-container-div");
  const savedNodes = document.querySelector(".memory-save");
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
  document.getElementById("currentText").value = parseFloat(selected.innerHTML);
};

const OneMemory = (event) => {
  if (event.target.classList.contains("memories-buttons-md")) {
    event.target.parentNode.parentNode.remove();
    if (document.querySelector(".memory-save").childNodes.length < 4) {
      document.querySelector(".text-memory").style.cssText = "display: block;";
      document.querySelector(".text-memory").style.cssText = "display: block;";
      const off1 = document.querySelector(".off1");
      const off2 = document.querySelector(".off2");
      off1.disabled = true;
      off1.classList.remove("on");
      off2.disabled = true;
      off2.classList.remove("on");
    }
  }
  if (event.target.classList.contains("memories-buttons-mp")) {
    const newValue =
      event.target.parentNode.parentNode.querySelector(".memory-div-result");
    newValue.innerHTML =
      parseFloat(calculator.displayValue) + parseFloat(newValue.innerHTML);
  }
  if (event.target.classList.contains("memories-buttons-mm")) {
    const newValue2 =
      event.target.parentNode.parentNode.querySelector(".memory-div-result");
    newValue2.innerHTML =
      parseFloat(newValue2.innerHTML) - parseFloat(calculator.displayValue);
  }
};

const memorySave = document.querySelector(".memory-save");
memorySave.addEventListener("click", OneMemory);

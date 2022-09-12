"use strict";
class Calculator {
  constructor(
    DisplayValue,
    FirstNumber,
    interruption,
    operator,
    expression,
    PrevOp,
    PrevNumber
  ) {
    this.DisplayValue = DisplayValue;
    this.FirstNumber = FirstNumber;
    this.interruption = interruption;
    this.operator = operator;
    this.expression = expression;
    this.PrevOp = PrevOp;
    this.PrevNumber = PrevNumber;
  }
  // ------------------------------input numbers and operators------------------------------
  InputNumbers = (number) => {
    this.PrevNumber = null;
    const DisplayValue = this.DisplayValue;
    const interruption = this.interruption;
    if (interruption === true) {
      this.DisplayValue = number;
      this.interruption = false;
    } else {
      this.DisplayValue = DisplayValue == "0" ? number : DisplayValue + number;
    }
  };

  InputOperators = (operators) => {
    const FirstNumber = this.FirstNumber;
    const operator = this.operator;
    const realValue = parseFloat(this.DisplayValue);
    if (operators == "=" && this.FirstNumber && operator != "=") {
      const result = this.BasicOperators(FirstNumber, realValue, operator);
      if (result) {
        this.AddToHistory(true);
      }
      this.DisplayValue = `${parseFloat(result.toFixed(7))}`;
      document.getElementById(
        "PreviousNumber"
      ).innerHTML = `${this.FirstNumber} ${operator} ${realValue} ${operators}`;
      this.interruption = false;
    } else if (operators != "=" && this.DisplayValue != 0 && !this.expression) {
      if (!(operator && this.interruption)) {
        const prevText = document.getElementById("PreviousNumber");
        prevText.innerHTML += `${this.DisplayValue} ${operators}`;
      } else {
        const prevText = document.getElementById("PreviousNumber");
        prevText.innerHTML = `${this.DisplayValue} ${operators}`;
      }
      this.expression = false;
    } else if (operators == "=" && this.operator == "=" && this.PrevNumber) {
      const result = this.BasicOperators(
        realValue,
        this.PrevNumber,
        this.PrevOp
      );
      if (result) {
        this.AddToHistory(false);
      }
      this.DisplayValue = `${parseFloat(result.toFixed(7))}`;
      document.getElementById("PreviousNumber").innerHTML = "";
      this.interruption = true;
      return;
    } else if (this.PrevNumber) {
      document.getElementById(
        "PreviousNumber"
      ).innerHTML = `${this.FirstNumber} ${operators} `;
      this.PrevNumber = null;
    }

    if (operator && this.interruption) {
      this.operator = operators;
      return;
    }

    if (FirstNumber == null && !isNaN(realValue)) {
      this.FirstNumber = realValue;
    } else if (operator) {
      const result = this.BasicOperators(FirstNumber, realValue, operator);
      this.DisplayValue = `${parseFloat(result.toFixed(7))}`;
      this.FirstNumber = result;
    }
    this.interruption = true;
    this.operator = operators;
  };

  getDisplayNumber(number) {
    const StringNumber = number.toString();
    const IntegerDigits = parseFloat(StringNumber.split(".")[0]);
    const DecimalDigits = StringNumber.split(".")[1];
    let IntegerDisplay;
    if (isNaN(IntegerDigits)) {
      IntegerDisplay = "";
    } else {
      IntegerDisplay = IntegerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (DecimalDigits != null) {
      return `${IntegerDisplay}.${DecimalDigits}`;
    } else {
      return IntegerDisplay;
    }
  }
  // ------------------------------add to history------------------------------
  AddToHistory = (bool) => {
    document.querySelector(".text-history").style.display = "none";
    const HistoryElem = document.getElementById("history-elements");
    const ContDiv = document.createElement("div");
    ContDiv.className = "history-container-div";
    if (HistoryElem.childNodes.length > 3) {
      HistoryElem.insertBefore(ContDiv, HistoryElem.FirstChild);
    } else {
      HistoryElem.appendChild(ContDiv);
      const TrashCanDiv = document.createElement("div");
      TrashCanDiv.className = "trash-div";
      HistoryElem.appendChild(TrashCanDiv);
      const TrashCan = document.createElement("img");
      TrashCan.className = "trash-main";
      TrashCan.src = "https://img.icons8.com/ios/50/000000/trash--v1.png";
      TrashCanDiv.appendChild(TrashCan);
      // ------------------------------right click for delete------------------------------
      let menu = null;
      document.addEventListener("DOMContentLoaded", function () {
        menu = document.querySelector(".menu");
        menu.classList.add("off");

        let HisContDiv = document.querySelector(".history-container-div");
        HisContDiv.addEventListener("contextmenu", showMenu);

        if (HisContDiv) {
          menu.addEventListener("mouseleave", hideMenu);
        }

        addMenuListeners();
      });

      function addMenuListeners() {
        document
          .getElementById("delete-item")
          .addEventListener("click", DeleteHistory);
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
    }
    // ------------------------------create element p / node / ParaAdd / para-result / node-result / delete-history------------------------------
    const para = document.createElement("p");
    if (this.expression) {
      const node = document.createTextNode(
        `${document.getElementById("PreviousNumber").innerHTML} =`
      );
      para.appendChild(node);
      this.expression = false;
    } else if (bool) {
      const node = document.createTextNode(
        `${document.getElementById("PreviousNumber").innerHTML} ${
          this.DisplayValue
        } =`
      );
      para.appendChild(node);
    } else {
      const node = document.createTextNode(
        `${this.DisplayValue} ${this.PrevOp} ${this.PrevNumber} =`
      );
      para.appendChild(node);
    }
    para.className = "ParaAdd";
    ContDiv.appendChild(para);

    const ParaResult = document.createElement("div");
    if (bool) {
      const ResultNode = document.createTextNode(
        `${parseFloat(
          this.BasicOperators(
            parseFloat(this.FirstNumber),
            parseFloat(this.DisplayValue),
            this.operator
          ).toFixed(7)
        )}`
      );
      ParaResult.appendChild(ResultNode);
    } else {
      const ResultNode = document.createTextNode(
        `${parseFloat(
          this.BasicOperators(
            parseFloat(this.DisplayValue),
            this.PrevNumber,
            this.PrevOp
          ).toFixed(7)
        )}`
      );
      ParaResult.appendChild(ResultNode);
    }
    ParaResult.className = "ResultAdd";
    ContDiv.appendChild(ParaResult);

    const DeleteHistory = document.createElement("div");
    DeleteHistory.className = "delete-history";
    ContDiv.appendChild(DeleteHistory);
    const trashIcon = document.createElement("img");
    trashIcon.src = "https://img.icons8.com/ios/20/000000/delete--v2.png";
    DeleteHistory.appendChild(trashIcon);
  };
  // ------------------------------function decimal / percent / clear / currentClear / delete------------------------------
  dot = (decimal) => {
    if (this.interruption === true) {
      this.DisplayValue = "0.";
      this.interruption = false;
      return;
    }
    if (!this.DisplayValue.includes(decimal)) {
      this.DisplayValue += decimal;
    }
  };

  percentage = () => {
    if (this.interruption === false) {
      let number = this.DisplayValue;
      number = this.FirstNumber * (this.DisplayValue / 100);
      number = parseFloat(number.toFixed(7));
      this.DisplayValue = number;
      return;
    } else {
      this.clear();
    }
  };

  clear = () => {
    this.DisplayValue = 0;
    this.FirstNumber = null;
    this.interruption = false;
    this.operator = null;
    document.getElementById("PreviousNumber").innerHTML = "";
    this.expression = null;
    this.PrevOp = null;
    this.PrevNumber = null;
  };

  CurrentClear = () => {
    this.DisplayValue = 0;
  };

  delete = () => {
    const length = this.DisplayValue.length - 1;
    if (length == 0) {
      this.DisplayValue = 0;
      this.DisplayUpdate();
    } else {
      const slicer = this.DisplayValue;
      this.DisplayValue = slicer.slice(0, length);
    }
  };
  // ------------------------------function spicial operators------------------------------
  SpecialOperators = (action) => {
    let number = this.DisplayValue;
    switch (action) {
      case "square":
        if (number > 1) {
          number = Math.sqrt(number);
          document.getElementById(
            "PreviousNumber"
          ).innerHTML = `√(${this.DisplayValue})`;
          this.DisplayValue = parseFloat(number.toFixed(7));
          this.FirstNumber = parseFloat(number.toFixed(7));
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
          "PreviousNumber"
        ).innerHTML = `sqr(${this.DisplayValue})`;
        this.DisplayValue = parseFloat(number.toFixed(7));
        this.FirstNumber = parseFloat(number.toFixed(7));
        this.expression = true;
        return;
      case "pow3":
        number = Math.pow(number, 3);
        document.getElementById(
          "PreviousNumber"
        ).innerHTML = `cube(${this.DisplayValue})`;
        this.DisplayValue = parseFloat(number.toFixed(7));
        this.FirstNumber = parseFloat(number.toFixed(7));
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
            "PreviousNumber"
          ).innerHTML = `1/(${this.DisplayValue})`;
          this.DisplayValue = parseFloat(number.toFixed(7));
          this.FirstNumber = parseFloat(number.toFixed(7));
          this.expression = true;
          return;
        }
      case "plus-minus":
        if (number > 0) {
          number = -Math.abs(number);
        } else {
          number = Math.abs(number);
        }
        this.DisplayValue = parseFloat(number.toFixed(7));
        this.FirstNumber = parseFloat(number.toFixed(7));
        return;
    }
  };
  // ------------------------------function spicial operators------------------------------
  BasicOperators = (FirstNumber, secondNumber, operator) => {
    switch (operator) {
      case "÷":
        if (!isFinite(FirstNumber / secondNumber)) {
          alert("cannot divide to zero");
          this.clear();
          return;
        }
        if (!this.PrevNumber) {
          this.PrevNumber = secondNumber;
        }
        this.PrevOp = "÷";
        return FirstNumber / secondNumber;
      case "×":
        this.PrevOp = "×";
        if (!this.PrevNumber) {
          this.PrevNumber = secondNumber;
        }
        return FirstNumber * secondNumber;
      case "-":
        this.PrevOp = "-";
        if (!this.PrevNumber) {
          this.PrevNumber = secondNumber;
        }
        return FirstNumber - secondNumber;
      case "+":
        this.PrevOp = "+";
        if (!this.PrevNumber) {
          this.PrevNumber = secondNumber;
        }
        return FirstNumber + secondNumber;
    }
    return secondNumber;
  };
  // ------------------------------update the display------------------------------
  DisplayUpdate = () => {
    const display = document.querySelector(".currentNumber");
    display.value = this.getDisplayNumber(this.DisplayValue);
  };
  // ------------------------------which buttons is clicked------------------------------
  ButtonClicked = (e) => {
    const target = e.target;
    if (!target.matches("button")) {
      return;
    }
    if (target.classList.contains("operations")) {
      this.InputOperators(target.value);
      this.DisplayUpdate();
      return;
    }
    if (target.classList.contains("percentage")) {
      this.percentage();
      this.DisplayUpdate();
      return;
    }
    if (target.classList.contains("radical")) {
      this.SpecialOperators("square");
      this.DisplayUpdate();
      return;
    }
    if (target.classList.contains("x2")) {
      this.SpecialOperators("pow2");
      this.DisplayUpdate();
      return;
    }
    if (target.classList.contains("x3")) {
      this.SpecialOperators("pow3");
      this.DisplayUpdate();
      return;
    }
    if (target.classList.contains("1/x")) {
      this.SpecialOperators("1/x");
      this.DisplayUpdate();
      return;
    }
    if (target.classList.contains("plus-minus")) {
      this.SpecialOperators("plus-minus");
      this.DisplayUpdate();
      return;
    }
    if (target.classList.contains("decimal")) {
      this.dot(target.value);
      this.DisplayUpdate();
      return;
    }
    if (target.classList.contains("CurrentClear")) {
      this.CurrentClear();
      this.DisplayUpdate();
      return;
    }
    if (target.classList.contains("clear")) {
      this.clear();
      this.DisplayUpdate();
      return;
    }
    if (target.classList.contains("delete")) {
      this.delete();
      this.DisplayUpdate();
      return;
    }
    this.InputNumbers(target.value);
    this.DisplayUpdate();
  };
}
const calculator = new Calculator("0", null, false, null, false, null, null);

const buttons = document.querySelector("#buttons");
buttons.addEventListener("click", calculator.ButtonClicked);
calculator.DisplayUpdate();

function changeFunction() {
  document.querySelector(".memory-save").style.display = "none !important";
  document.querySelector(".history-save").style.display = "none !important";
}
let x = window.matchMedia("(max-width: 500px)");
x.addEventListener("change", changeFunction);

var currentNumberElem = document.getElementById("currentNumber");
currentNumberElem.focus();
currentNumberElem.scrollLeft = currentNumberElem.scrollWidth;
// ------------------------------history and memory------------------------------
const memory = document.querySelector(".memory");
const history = document.querySelector(".his");

const MemoryFunction = () => {
  memory.style.borderBottom = "3px solid orange";
  memory.style.paddingBottom = "3px";
  history.style.border = "none";
  history.style.padding = "0";
  document.querySelector(".memory-save").style.display = "block";
};

const HistoryFunction = () => {
  history.style.borderBottom = "3px solid orange";
  history.style.paddingBottom = "3px";
  memory.style.border = "none";
  memory.style.padding = "0";
  document.querySelector(".memory-save").style.display = "none";
};

memory.addEventListener("click", MemoryFunction);
history.addEventListener("click", HistoryFunction);

const ShowHistory = () => {
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

const ShowHiddenMemory = () => {
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
const HistoryElement = document.getElementById("history-elements");
HistoryElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-history")) {
    e.target.parentNode.remove();
    if (HistoryElement.childNodes.length < 5) {
      document.querySelector(".text-history").style.display = "block";
      document.querySelector(".trash-main").parentNode.remove();
    }
  }
  if (e.target.classList.contains("trash-div")) {
    if (HistoryElement.childNodes.length > 3) {
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
const CreateMemoryElement = () => {
  const memory = document.querySelector(".memory-save");

  const contMem = document.createElement("div");
  contMem.className = "memory-container-div";
  if (memory.childNodes.length > 3) {
    memory.insertBefore(contMem, memory.FirstChild);
  } else {
    memory.appendChild(contMem);
  }

  const memoryPara = document.createElement("p");
  memoryPara.className = "memory-div-result";
  memoryPara.innerHTML = calculator.DisplayValue;
  contMem.appendChild(memoryPara);

  const ContDiv = document.createElement("div");
  ContDiv.className = "memory-div";
  contMem.appendChild(ContDiv);

  const smallButtons1 = document.createElement("button");
  smallButtons1.className = "memory-btn-Mdelete";
  smallButtons1.innerHTML = "MC";
  ContDiv.appendChild(smallButtons1);

  const smallButtons2 = document.createElement("button");
  smallButtons2.className = "memory-btn-Mplus";
  smallButtons2.innerHTML = "M+";
  ContDiv.appendChild(smallButtons2);

  const smallButtons3 = document.createElement("button");
  smallButtons3.className = "memory-btn-Mminus";
  smallButtons3.innerHTML = "M-";
  ContDiv.appendChild(smallButtons3);
};

const MemorySave = () => {
  document.querySelector(".text-memory").style.display = "none";
  CreateMemoryElement();
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
const HistoryClear = () => {
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

const MemoryClear = () => {
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
const MR = () => {
  const memoryDivs = document.querySelectorAll(".memory-container-div");
  let selected = memoryDivs[0].querySelector(".memory-div-result");
  calculator.DisplayValue = parseFloat(selected.innerHTML);
  document.getElementById("currentNumber").value = parseFloat(
    selected.innerHTML
  );
};

const MemoryPlus = () => {
  const savedNodes = document.querySelector(".memory-save");
  const memoryDivs = document.querySelectorAll(".memory-container-div");
  if (savedNodes.childNodes.length > 3) {
    let selected = memoryDivs[0].querySelector(".memory-div-result");
    selected.innerHTML =
      parseFloat(calculator.DisplayValue) + parseFloat(selected.innerHTML);
  } else {
    MemorySave();
  }
};

const MemoryMinus = () => {
  const savedNodes = document.querySelector(".memory-save");
  const memoryDivs = document.querySelectorAll(".memory-container-div");
  if (savedNodes.childNodes.length > 3) {
    let selected = memoryDivs[0].querySelector(".memory-div-result");
    selected.innerHTML =
      parseFloat(selected.innerHTML) - parseFloat(calculator.DisplayValue);
  } else {
    MemorySave();
  }
};

const MemoryPart = (e) => {
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
      parseFloat(calculator.DisplayValue) + parseFloat(newValue.innerHTML);
  }
  if (e.target.classList.contains("memory-btn-Mminus")) {
    const newValue2 =
      e.target.parentNode.parentNode.querySelector(".memory-div-result");
    newValue2.innerHTML =
      parseFloat(newValue2.innerHTML) - parseFloat(calculator.DisplayValue);
  }
};

const memorySave = document.querySelector(".memory-save");
memorySave.addEventListener("click", MemoryPart);

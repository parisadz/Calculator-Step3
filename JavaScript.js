/* themable part */
:root[data-theme="default"] {
  --background: #f3f3f3;
  --dark-btn: #e8e8e8;
  --num-btn: #fdfdfd;
  --hover-gray: #e1e1e1;
  --menu-hover: #e3e3e3;
  --radius: 0;
  --font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

:root[data-theme="green"] {
  --background: #bdf77a;
  --dark-btn: #53bf3e;
  --num-btn: #c4f13a;
  --hover-gray: #33721b;
  --menu-hover: #33721b;
  --radius: 15px;
  --font-family: "Inconsolata", monospace;
}

:root[data-theme="blue"] {
  --background: #68fcfc;
  --dark-btn: #57a9ca;
  --num-btn: #7fc0eb;
  --hover-gray: #08639f;
  --menu-hover: #2166ef;
  --radius: 15px 0 15px 0;
  --font-family: "Kalam", cursive;
}

:root[data-theme="purple"] {
  --background: #cd51d8;
  --dark-btn: #6b136b;
  --num-btn: #f04df0;
  --hover-gray: #530053;
  --menu-hover: #530053;
  --radius: 10px 10px 10px 0;
  --font-family: "Pathway Gothic One", sans-serif;
}
/* themable part */

/* ------------------------------------------------------------------------ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-family);
}

html,
body {
  display: flex;
  width: 100%;
  height: 100%;
  background: var(--background);
}

#container {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: minmax(300px, 100%);
  grid-template-rows: minmax(33px, 4%) minmax(120px, 33%) minmax(257px, 62%);
  grid-template-areas:
    "header"
    "result"
    "buttons";
  overflow-y: auto;
  overflow-x: auto;
}

/* the header part */
#header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
}

ul {
  display: flex;
  list-style: none;
  width: 137px;
}

li {
  height: 100%;
  width: 33.333333%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li:hover {
  background-color: var(--menu-hover);
}

li:hover:nth-child(3n) {
  background-color: var(--hover-gray);
}

h1 {
  font-family: var(--font-family);
  font-size: 0.8rem;
  margin-top: 8px;
  margin-left: 10px;
}
/* the header part */

/* ------------------------------------------------------------------------ */

/* the upper result part */
.standard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.stand {
  margin-left: 5px;
  margin-top: 7px;
  font-size: 1.3em;
  font-family: var(--font-family);
}

.up {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 18%;
}

.menu-icon {
  width: 39px;
  height: 39px;
  padding: 10px;
}

.menu-icon:hover {
  background-color: var(--menu-hover);
  border-radius: var(--radius);
}

.history-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
}

.history-icon-container:hover {
  background-color: var(--menu-hover);
}
/* the upper result part */

/* ------------------------------------------------------------------------ */

/* the result part */
#result {
  grid-area: result;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.resultText {
  display: flex;
  align-self: flex-end;
  flex-direction: column;
  margin-right: 10px;
  font-family: var(--font-family);
}

#PreviousNumber {
  align-self: flex-end;
  color: #b1afaf;
  font-family: var(--font-family);
}

.currentNumber {
  width: 100%;
  padding-left: 4px;
  border: none;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: right;
  font-family: var(--font-family);
  background-color: transparent;
  resize: none;
  outline: none;
}
/* the result part */

/* ------------------------------------------------------------------------ */

/* M's part */
.small {
  width: 100%;
  height: 18%;
  display: flex;
  justify-content: space-between;
}

.small-btn-ms {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  max-width: 350px;
}

.small-ms {
  height: 90%;
  width: 19%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  font-family: var(--font-family);
  border: none;
  background-color: transparent;
}

.active:hover {
  background-color: var(--hover-gray);
  border-radius: var(--radius);
}

.extera {
  display: block;
}

button:hover:enabled {
  background-color: var(--hover-gray);
}
/* M's part */

/* ------------------------------------------------------------------------ */

/* the buttons part */
#buttons {
  grid-area: buttons;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.Btn img {
  width: 22px;
  height: 22px;
}

.num {
  background-color: var(--num-btn);
}

.dark {
  background-color: var(--dark-btn);
}

#buttons .bthide {
  display: none;
}

.Btn {
  width: 24.5%;
  height: 16.1%;
  border: none;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
}

.Btn:hover {
  background-color: var(--hover-gray);
}

.Btn:hover:nth-child(5n) {
  background-color: var(--hover-gray);
}
/* the buttons part */

/* ------------------------------------------------------------------------ */

/* the history and memory part */
#history,
.bthide {
  display: none;
}

.his,
.memory {
  color: black;
}

.history-and-memory {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 13px;
  font-family: var(--font-family);
}

.hidden-history,
.hidden-memory {
  position: absolute;
  overflow: auto;
  width: 100%;
  height: 62%;
  min-height: 240px;
  z-index: -1;
  top: 38%;
  background-color: var(--background);
}

.memory {
  margin-top: 4px;
  border-bottom: 3px solid orange;
  margin-left: 35px;
}

.memory:hover,
.his:hover {
  color: var(--hover-gray);
}

.his {
  margin-top: 7px;
  padding-bottom: 3px;
}

#history a {
  text-decoration: none;
}

.text-history,
.text-memory {
  margin-top: 30px;
  margin-left: 8px;
  font-size: 0.9em;
  font-weight: 600;
}

.history-container-div {
  background-color: var(--background);
  position: relative;
  width: 100%;
  height: 100px;
  padding: 20px;
}

.history-container-div:hover {
  background-color: var(--hover-gray);
}

.memory-container-div {
  background-color: var(--background);
  position: relative;
  width: 100%;
  height: 80px;
  padding: 10px;
  margin-top: 10px;
}

.memory-container-div:hover {
  background-color: var(--hover-gray);
}

.memory-div-result {
  font-size: 30px;
  font-weight: 700;
  text-align: right;
}

.memory-div {
  position: absolute;
  top: 45px;
  width: 150px;
  height: 30px;
  right: 10px;
  display: flex;
  justify-content: space-around;
  display: block;
}

.memory-btn-Mdelete,
.memory-btn-Mplus,
.memory-btn-Mminus {
  border: none;
  width: 32%;
  height: 100%;
}

.memory-div button:hover {
  background: var(--hover-gray);
}

.delete-history {
  width: 30px;
  height: 40px;
  position: absolute;
  top: 10px;
  left: 50px;
  background-color: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-history:hover {
  background-color: #898989;
}

.delete-history-hidden {
  display: none;
}

.trash-div {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  padding: 20px;
}

.trash-div:hover {
  background-color: var(--hover-gray);
  border-radius: var(--border);
}

.trash-main {
  width: 20px;
  height: 20px;
}

.history-save,
.memory-save {
  display: none;
}

.menu {
  width: 5rem;
  height: 2rem;
  background-color: #f4f4f4;
  color: #333;
  box-shadow: 2px 2px 2px #999;
  border-radius: 0.2rem;
  list-style: none;
  position: fixed;
}

.menu.off {
  top: -200%;
  left: -200%;
}

.menu-item {
  height: 1.5rem;
  font-size: 1rem;
  font-weight: 100;
  padding: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
}

.menu-item:hover,
.menu-item:active {
  color: #000;
  font-weight: 500;
}
/* the history and memory part */

/* ------------------------------------------------------------------------ */

.ParaAdd {
  font-size: 15px;
  width: 100%;
  height: 20%;
  text-align: right;
  color: rgba(0, 0, 0, 0.5);
}

.ResultAdd {
  font-size: 30px;
  font-weight: 700;
  text-align: right;
  margin-top: 15px;
}

.first {
  order: -1;
}

.second {
  order: -2;
}

.third {
  order: -3;
}

.fourth {
  order: -4;
}

/* ------------------------------------------------------------------------ */

/* media */
@media screen and (min-width: 500px) {
  #container {
    grid-template-columns: minmax(57%, auto) minmax(43%, 320px);
    grid-template-areas:
      "header header"
      "result history"
      "buttons history";
  }

  .Btn {
    font-family: var(--font-family);
    font-size: 1rem;
  }

  #history {
    display: block;
    grid-area: history;
  }

  .extera {
    display: none;
  }

  .history-icon {
    display: none;
  }

  .small-btn-ms {
    width: 100%;
    max-width: 400px;
  }

  .history-icon-container {
    display: none;
  }

  .history-save {
    display: block;
    position: absolute;
    overflow: auto;
    width: 320px;
    max-width: 42%;
    height: 83%;
    top: 70px;
    right: 0;
    z-index: 1;
    background-color: var(--background);
  }

  .memory-save {
    display: block;
    position: absolute;
    overflow: auto;
    width: 320px;
    max-width: 42%;
    height: 83%;
    top: 70px;
    right: 0;
    z-index: 1;
    background-color: var(--background);
  }

  .text-memory {
    margin-top: 30px;
    font-size: 0.9em;
  }
}

@media screen and (min-width: 740px) {
  #container {
    grid-template-columns: auto 320px;
  }

  .Btn img {
    width: 26px;
    height: 26px;
  }
}

@media screen and (min-width: 1024px) and (min-height: 620px) {
  #buttons .bthide {
    display: block;
  }

  .Btn {
    width: 19.6%;
    height: 19.2%;
    order: 1;
    font-family: var(--font-family);
    font-size: 1.5rem;
  }
}
/* media */

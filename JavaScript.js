"use strict";

let root = document.querySelector("html");
let btnmenu = document.querySelector(".menu");
const btnone = document.getElementById("one");

btnmenu.addEventListener("click", function () {
  if (root.getAttribute("data-theme") === "defult") {
    root.setAttribute("data-theme", "green");
  } else if (root.getAttribute("data-theme") === "green") {
    root.setAttribute("data-theme", "blue");
  } else if (root.getAttribute("data-theme") === "blue") {
    root.setAttribute("data-theme", "purple");
  } else {
    root.setAttribute("data-theme", "defult");
  }
});

// const x = () => {
//   const number = document.querySelector(".number").innerHTML;
//   if (number == 0) {
//     document.querySelector(".number").innerHTML =
//       document.getElementById("one").innerHTML;
//   } else {
//     document.querySelector(".number").innerHTML +=
//       document.getElementById("one").innerHTML;
//   }
// };
// btnone.addEventListener("click", x);

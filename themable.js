"use strict";

let root = document.querySelector("html");
let btnmenu = document.querySelector(".menu-icon");
console.log("welcome");

// themeable
btnmenu.addEventListener("click", function () {
  if (root.getAttribute("data-theme") === "default") {
    root.setAttribute("data-theme", "green");
  } else if (root.getAttribute("data-theme") === "green") {
    root.setAttribute("data-theme", "blue");
  } else if (root.getAttribute("data-theme") === "blue") {
    root.setAttribute("data-theme", "purple");
  } else if (root.getAttribute("data-theme") === "purple") {
    root.setAttribute("data-theme", "default");
  }
});

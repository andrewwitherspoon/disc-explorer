import setup from "./setup";
setup();

import pym from "pym.js";
import makeDiscChart from "./disc-template";
import makeThrowChart from "./throw-template";
import theData from "../data/data.json";

function main() {

  const discsButton = document.getElementById("discs-button");
  const throwsButton = document.getElementById("throws-button");
  const discsView = document.getElementById("discs-view");
  const throwsView = document.getElementById("throws-view");

  discsButton.addEventListener("click", () => {
    discsView.style.display = "block";
    throwsView.style.display = "none";
    discChart.update();
  })
  throwsButton.addEventListener("click", () => {
    discsView.style.display = "none";
    throwsView.style.display = "block";
    throwChart.update();
  })

  const discChart = new makeDiscChart({
    element: document.querySelector("#discs-view .chart"),
    data: theData
  });

  const throwChart = new makeThrowChart({
    element: document.querySelector("#throws-view .chart"),
    data: theData
  });

  window.addEventListener("optimizedResize", () => {
    discChart.update();
    throwChart.update();
  });

  new pym.Child({
    polling: 500
  });
}

window.onload = main;

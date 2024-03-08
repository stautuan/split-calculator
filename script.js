"use strict";

const bigInput = document.querySelectorAll(".big-input");
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipButtons = document.querySelectorAll(".buttons");
const customTip = document.getElementById("custom-tip");
const warning = document.querySelector(".warning");
const tipPersonBox = document.querySelector(".tip-person-box");
const totalPersonBox = document.querySelector(".total-person-box");
const amountBox = document.querySelectorAll(".amount-box");
const resetButton = document.querySelector(".reset");

// resetting the app
const resetApp = function () {
  bigInput.forEach(function (inputElement) {
    inputElement.setAttribute("placeholder", "0");
    inputElement.value = "";
  });

  customTip.setAttribute("placeholder", "Custom");
  customTip.value = "";

  warning.classList.add("hidden");

  amountBox.forEach(function (box) {
    box.textContent = "$0.00";
  });

  resetButton.style.backgroundColor = "#0d686d";
};
resetButton.addEventListener("click", resetApp);

// activating the app
const focusEvent = function () {
  resetButton.style.backgroundColor = "#26c0ab";
};
customTip.addEventListener("focus", function () {
  focusEvent(customTip);
});
billInput.addEventListener("focus", function () {
  focusEvent(billInput);
});
peopleInput.addEventListener("focus", function () {
  focusEvent(peopleInput);
});

// calculating the tip
let selectedTip = 0;

const calcTip = function () {
  const billAmount = Number(billInput.value);
  const numberOfPeople = Number(peopleInput.value);

  if (numberOfPeople > 0 && billAmount > 0) {
    const tipPercent = selectedTip > 0 ? selectedTip / 100 : 0;
    const tipAmountPerPerson = (billAmount * tipPercent) / numberOfPeople;
    const totalAmountPerPerson = billAmount / numberOfPeople;

    tipPersonBox.textContent = `$${Number(tipAmountPerPerson).toFixed(2)}`;
    totalPersonBox.textContent = `$${(
      Number(tipAmountPerPerson) + Number(totalAmountPerPerson)
    ).toFixed(2)}`;

    warning.classList.add("hidden");
  } else {
    warning.classList.remove("hidden");
  }
};

billInput.addEventListener("input", calcTip);
peopleInput.addEventListener("input", calcTip);

tipButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedTip = Number(button.textContent.replace("%", ""));
    customTip.value = "";
    calcTip();
  });
});

customTip.addEventListener("input", function () {
  selectedTip = Number(customTip.value);
  calcTip();
});

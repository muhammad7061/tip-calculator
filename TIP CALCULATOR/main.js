const billInput = document.getElementById("bill-input");
const numPeopleInput = document.getElementById("num-people-input");
const range = document.getElementById("range-slider");
const rangeValue = document.getElementById("range-value");
const customTipInput = document.getElementById("custom-tip");
const tipButtons = document.querySelectorAll("#tip-buttons button");

const tipAmountResult = document.getElementById("tip-amount");
const totalResult = document.getElementById("total-result");
const tipPerPersonResult = document.getElementById("tip-per-person");
const totalPerPersonResult = document.getElementById("total-per-person");

const div_displayer = document.querySelector(".split-identifier");
const p_displayer = document.querySelector("#people-displayer");
const people_changer = document.querySelector("#num-people-display");

const calculateBtn = document.getElementById("calculate-btn");
const resetBtn = document.querySelector('button[type="reset"]');

function updateSliderBackground(value) {
  let percent = (value / range.max) * 100;
  range.style.background = `linear-gradient(90deg, #164f63 ${percent}%, #eee ${percent}%)`;
}

function setTipPercentage(value) {
  for (let i = 0; i < tipButtons.length; i++) {
    tipButtons[i].classList.remove("active");
  }
  range.value = value;
  rangeValue.textContent = value;
  customTipInput.value = value;
  for (let i = 0; i < tipButtons.length; i++) {
    if (tipButtons[i].dataset.tip == value) {
      tipButtons[i].classList.add("active");
    }
  }
  updateSliderBackground(value);
}

function calculateBill() {
  let bill = parseFloat(billInput.value);
  if (isNaN(bill) || bill <= 0) {
    alert("Please enter a valid bill amount greater than 0.");
    return;
  }
  let numPeople = parseInt(numPeopleInput.value);
  if (isNaN(numPeople) || numPeople <= 0) {
    alert("Please enter a valid number of people greater than 0.");
    return;
  }
  let tipPercent = parseInt(range.value);
  let tipAmount = bill * (tipPercent / 100);
  let totalAmount = bill + tipAmount;
  let tipPerPerson = tipAmount / numPeople;
  let totalPerPerson = totalAmount / numPeople;
  tipAmountResult.textContent = `$${tipAmount.toFixed(2)}`;
  totalResult.textContent = `$${totalAmount.toFixed(2)}`;
  tipPerPersonResult.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalPerPersonResult.textContent = `$${totalPerPerson.toFixed(2)}`;
}

range.addEventListener("input", () => {
  rangeValue.textContent = range.value;
  setTipPercentage(range.value);
});

customTipInput.addEventListener("input", () => {
  if (customTipInput.value) {
    setTipPercentage(customTipInput.value);
  }
});

for (let i = 0; i < tipButtons.length; i++) {
  tipButtons[i].addEventListener("click", () => {
    setTipPercentage(tipButtons[i].dataset.tip);
  });
}

calculateBtn.addEventListener("click", () => {
  calculateBill();
  let bill = parseFloat(billInput.value);
  let numPeople = parseInt(numPeopleInput.value);

  if (!isNaN(bill) && bill > 0 && !isNaN(numPeople) && numPeople > 0) {
    div_displayer.style.display = "block";
    p_displayer.style.display = "inline";
  }
  if (numPeopleInput.value === "" || parseInt(numPeopleInput.value) <= 0) {
    people_changer.textContent = "1";
  } else {
    people_changer.textContent = numPeopleInput.value;
  }
  let customTip = parseInt(customTipInput.value) || 0;
  if (customTip > 50) {
    alert(
      "Unbelievable generosity! You’ve gone above and beyond. \nYour kindness is making the world a better place!"
    );
  } else if (customTip === 50) {
    alert(
      "Half the bill as a tip? That’s legendary generosity! \n50%! You’re setting the gold standard for kindness."
    );
  } else if (customTip > 35 && customTip < 50) {
    alert(
      "Wow! That’s incredibly generous of you. \nAmazing! Your kindness shines at this level."
    );
  } else if (customTip === 25) {
    alert(
      "Nice choice! A 25% tip shows real appreciation for great service. \n25%! You’re making someone’s day brighter."
    );
  } else if (customTip > 25 && customTip <= 35) {
    alert(
      "Great choice! That’s a very generous tip. \nYou’re showing amazing appreciation with this tip! \nKindness like yours makes all the difference."
    );
  }
});

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  numPeopleInput.value = "";
  customTipInput.value = "";
  setTipPercentage(10);
  tipAmountResult.textContent = "$0.00";
  totalResult.textContent = "$0.00";
  div_displayer.style.display = "none";
  p_displayer.style.display = "none";
  tipPerPersonResult.textContent = "$0.00";
  totalPerPersonResult.textContent = "$0.00";
});

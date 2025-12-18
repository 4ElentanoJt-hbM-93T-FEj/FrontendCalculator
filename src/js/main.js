"use strict";

let inputNumber = document.querySelector(".input__field");
document.querySelector(".clean").addEventListener("click", () => {
  inputNumber.value = "";
});

document.querySelector(".percent").addEventListener("click", () => {
  inputNumber.value %= +inputNumber.value;
});

document.querySelector(".plus").addEventListener("click", () => {
  inputNumber.value = `${inputNumber.value}+`;
});

document.querySelector(".point").addEventListener("click", () => {
  inputNumber.value += parseFloat(inputNumber.value);
});

// add number click event behavior
for (let index = 0; index <= 9; index++) {
  document.querySelector(`.number__${index}`).addEventListener("click", () => {
    inputNumber.value += index;
  });
}

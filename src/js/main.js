"use strict";

const inputNumber = document.querySelector(".input__field");

const operatorsList = new Object({
  plus: "+",
  subtraction: "-",
  division: "/",
  multiplication: "*",
});

//? Добавляем свой метод в прототип строк!
String.prototype.replaceAt = function (index, char) {
  return (
    this.substring(0, index) + char + this.substring(index + 1, this.length)
  );
};

//? Очистка поля
document.querySelector(".clean").addEventListener("click", () => {
  inputNumber.value = "0";
});

for (const item in operatorsList) {
  document.querySelector(`.${item}`).addEventListener("click", () => {
    addOperator(operatorsList[item]);
  });
}

function addOperator(operator = "") {
  if (
    !Object.values(operatorsList).includes(
      inputNumber.value[inputNumber.value.length - 1]
    )
  ) {
    inputNumber.value += operator;
  } else {
    inputNumber.value = inputNumber.value.replaceAt(
      inputNumber.value.length - 1,
      operator
    );
  }
}

document.querySelector(".percent").addEventListener("click", () => {
  //   inputNumber.value %= +inputNumber.value;
});

document.querySelector(".point").addEventListener("click", () => {
  //   inputNumber.value += parseFloat(inputNumber.value);
});

// add number click event behavior
for (let index = 0; index <= 9; index++) {
  document.querySelector(`.number__${index}`).addEventListener("click", () => {
    if (inputNumber[inputNumber.value.length - 1] === "0")
      inputNumber.value += index;
  });
}

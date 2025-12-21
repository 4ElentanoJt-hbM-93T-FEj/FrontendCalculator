"use strict";

class Calculator {
  constructor() {
    this.input = document.getElementById("number");
    this.history = document.getElementById("history");
    this.currentInput = "";
    this.previousInput = "";
    this.operator = null;
    this.waitingForNewInput = false;
    this.initialize();
  }

  initialize() {
    // Очистка
    document
      .querySelector(".clean")
      .addEventListener("click", () => this.clear());

    // Процент
    document
      .querySelector(".percent")
      .addEventListener("click", () => this.percent());

    // Смена знака
    document
      .querySelector(".plus-minus")
      .addEventListener("click", () => this.toggleSign());

    // Точка
    document
      .querySelector(".point")
      .addEventListener("click", () => this.addDecimal());

    // Удаление последнего символа
    document
      .querySelector(".backspace__btn")
      .addEventListener("click", () => this.backspace());

    // Равно
    document
      .querySelector(".equality")
      .addEventListener("click", () => this.calculate());

    // Обработчики для цифр
    document.querySelectorAll(".number-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const number = button.getAttribute("data-number");
        this.appendNumber(number);
      });
    });

    // Обработчики для операторов
    document.querySelectorAll(".operator:not(.equality)").forEach((button) => {
      button.addEventListener("click", () => {
        const operation = this.getOperationFromButton(button);
        this.setOperation(operation);
      });
    });

    // Обработка ввода с клавиатуры
    this.input.addEventListener("keydown", (e) => this.handleKeyboardInput(e));
  }

  appendNumber(number) {
    if (this.waitingForNewInput) {
      this.currentInput = "";
      this.waitingForNewInput = false;
    }

    if (this.currentInput.length >= 15) return; // Ограничение длины

    if (number === "0" && this.currentInput === "0") return;
    if (number !== "0" && this.currentInput === "0") {
      this.currentInput = "";
    }

    this.currentInput += number;
    this.updateDisplay();
  }

  addDecimal() {
    if (this.waitingForNewInput) {
      this.currentInput = "0.";
      this.waitingForNewInput = false;
    } else if (this.currentInput === "") {
      this.currentInput = "0.";
    } else if (!this.currentInput.includes(".")) {
      this.currentInput += ".";
    }
    this.updateDisplay();
  }

  setOperation(operation) {
    if (this.currentInput === "") return;

    if (
      this.previousInput !== "" &&
      this.operator &&
      !this.waitingForNewInput
    ) {
      this.calculate();
    }

    this.operator = operation;
    this.previousInput = this.currentInput;
    this.waitingForNewInput = true;

    // Отображение истории
    this.history.textContent = `${this.previousInput} ${this.operator}`;
  }

  calculate() {
    if (
      this.operator === null ||
      this.previousInput === "" ||
      this.currentInput === ""
    )
      return;

    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);
    let result;

    switch (this.operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "/":
        if (current === 0) {
          this.showError("Деление на ноль!");
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    // Округление для избежания ошибок с плавающей точкой
    result = Math.round(result * 100000000) / 100000000;

    this.currentInput = result.toString();
    this.history.textContent = `${this.previousInput} ${this.operator} ${current} =`;
    this.previousInput = "";
    this.operator = null;
    this.waitingForNewInput = true;
    this.updateDisplay();
  }

  percent() {
    if (this.currentInput === "") return;

    const current = parseFloat(this.currentInput);
    this.currentInput = (current / 100).toString();
    this.updateDisplay();
  }

  toggleSign() {
    if (this.currentInput === "" || this.currentInput === "0") return;

    if (this.currentInput.startsWith("-")) {
      this.currentInput = this.currentInput.substring(1);
    } else {
      this.currentInput = "-" + this.currentInput;
    }
    this.updateDisplay();
  }

  clear() {
    this.currentInput = "";
    this.previousInput = "";
    this.operator = null;
    this.waitingForNewInput = false;
    this.history.textContent = "";
    this.updateDisplay();
  }

  backspace() {
    if (this.currentInput.length > 0) {
      this.currentInput = this.currentInput.slice(0, -1);
      this.updateDisplay();
    }
  }

  updateDisplay() {
    if (this.currentInput === "" || this.currentInput === "-") {
      this.input.value = "0";
    } else {
      // Форматирование числа с разделителями тысяч
      const num = parseFloat(this.currentInput);
      if (!isNaN(num)) {
        this.input.value = num.toLocaleString("ru-RU", {
          maximumFractionDigits: 8,
        });
      } else {
        this.input.value = this.currentInput;
      }
    }
  }

  getOperationFromButton(button) {
    const text = button.textContent;
    switch (text) {
      case "+":
        return "+";
      case "-":
        return "-";
      case "×":
        return "×";
      case "/":
        return "/";
      default:
        return text;
    }
  }

  showError(message) {
    this.input.value = message;
    this.currentInput = "";
    this.previousInput = "";
    this.operator = null;
    this.waitingForNewInput = false;
    this.history.textContent = "";

    setTimeout(() => {
      this.clear();
    }, 1500);
  }

  handleKeyboardInput(e) {
    const key = e.key;

    if (key >= "0" && key <= "9") {
      this.appendNumber(key);
    } else if (key === ".") {
      this.addDecimal();
    } else if (key === "+") {
      this.setOperation("+");
    } else if (key === "-") {
      this.setOperation("-");
    } else if (key === "*") {
      this.setOperation("×");
    } else if (key === "/") {
      e.preventDefault();
      this.setOperation("/");
    } else if (key === "Enter" || key === "=") {
      e.preventDefault();
      this.calculate();
    } else if (key === "Escape") {
      this.clear();
    } else if (key === "Backspace") {
      this.backspace();
    } else if (key === "%") {
      this.percent();
    }
  }
}

// Инициализация калькулятора
new Calculator();

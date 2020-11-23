// Variables
var input = document.getElementById('input'),
  operator = document.querySelectorAll('.operator div'),
  number = document.querySelectorAll('.number div'),
  clear = document.getElementById('clear'),
  result = document.getElementById('result'),
  resutlDisplayed = false;

// Event Listner for numbers
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener('click', (e) => {

    var currentInput = input.innerHTML;
    var lastChar = currentInput[currentInput.length - 1];

    if (resutlDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resutlDisplayed === true && lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
      resutlDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      resutlDisplayed = false;
      input.innerHTML = '';
      input.innerHTML = e.target.innerHTML;
    }
  });
}

// Event Listner for operators
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', (e) => {
    var currentInput = input.innerHTML;
    var lastChar = currentInput[currentInput.length - 1];

    if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
      var newInput = currentInput.substring(0, currentInput.length - 1) + e.target.innerHTML;
      input.innerHTML = newInput;
    } else if (input.innerHTML === '') {
      console.log('First enter a number');
    } else {
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// Event listner for result
result.addEventListener('click', () => {
  // Input
  var inputValues = input.innerHTML;

  // Array of Numbers 
  var numbers = inputValues.split(/\+|\-|\×|\÷/g);

  // Array of Operators
  var operators = inputValues.replace(/[0-9]|\./g, '').split('');

  console.log(inputValues);
  console.log(numbers);
  console.log(operators);

  // Division
  var divide = operators.indexOf('÷');
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf('÷');
  }

  // Multipllication
  var multiply = operators.indexOf('×');
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf('×');
  }

  // Substraction
  var substract = operators.indexOf('-');
  while (substract != -1) {
    numbers.splice(substract, 2, numbers[substract] - numbers[substract + 1]);
    operators.splice(substract, 1);
    substract = operators.indexOf('-');
  }

  // Addition
  var add = operators.indexOf('+');
  while (add != -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add);
    add = operators.indexOf('+');
  }

  // Output
  input.innerHTML = numbers[0];

  resutlDisplayed = true;
});

// Event Listner for clear
clear.addEventListener('click', () => input.innerHTML = '');
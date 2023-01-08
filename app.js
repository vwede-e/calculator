function add(operand1, operand2) {
    return typeof +operand1 === "number" && typeof +operand2 === "number" ?
    +(operand1) + +(operand2) : "Enter two valid numbers";
}

function subtract(operand1, operand2) {
    return typeof +operand1 === "number" && typeof +operand2 === "number" ?
    +(operand1) - +(operand2) : "Enter two valid numbers";
}

function multiply(operand1, operand2) {
    return typeof +operand1 === "number" && typeof +operand2 === "number" ?
    +(operand1) * +(operand2) : "Enter two valid numbers";
}

function divide(operand1, operand2) {
    return typeof +operand1 === "number" && typeof +operand2 === "number" ?
    +(operand1) / +(operand2) : "Enter two valid numbers";
}

function operate(operand1, operator, operand2) {
    let result;
    switch (operator) {
        case "+":
            return result = add(operand1, operand2);
        case "-":
           return result = subtract(operand1, operand2);
        case "*":
            return result = multiply(operand1, operand2);
        case "/":
            return result = divide(operand1, operand2);
            break;
        default:
            return "Enter a valid operator";
    }
}

calculatorValue = {
    value1: "",
    operator: "",
    value2: "",
    total: 0
}

input = document.querySelector("input");
del = document.querySelector(".del");
reset = document.querySelector(".reset");
equal = document.querySelector(".equal");
dot = document.querySelector(".dot");

dot.addEventListener("click", addDot);


function addDot(event) {
    if (!calculatorValue.operator && !calculatorValue.value1.includes(".")) {
        calculatorValue.value1 += ".";
        input.value += ".";
        return;
    }
    if (calculatorValue.operator && !calculatorValue.value2.includes(".")) {
        calculatorValue.value2 += ".";
        input.value += ".";
    }
}

numbers = document.querySelectorAll(".number");
for (number of numbers) {
    number.addEventListener("click", handleNumbers);
}

equal.addEventListener("click", equals);
reset.addEventListener("click", resetCalc);
del.addEventListener("click", ()=> input.value = input.value.slice(0,[input.value.length-1]));

operators = document.querySelectorAll(".operator");
for (operator of operators) {
    operator.addEventListener("click", handleOperators)
}

function handleNumbers(event) {
    if (!calculatorValue.operator) {
        calculatorValue.value1 += event.target.textContent;
        input.value += event.target.textContent;
    }
    else {
        calculatorValue.value2 += event.target.textContent;
        input.value += event.target.textContent;
    }
}

function handleOperators(event) {
    if (!calculatorValue.operator) { // if operator is pressed when no operation has been done.
        calculatorValue.operator = event.target.textContent;
        input.value += calculatorValue.operator;
    }
    else {
        if (calculatorValue.value2) { // when operator is pressed and two operands are already given
            result = operate(calculatorValue.value1, calculatorValue.operator, calculatorValue.value2);
            calculatorValue.total = +result;
            calculatorValue.value2 = "";
            calculatorValue.value1 = result;  // operation is done on the two operands and the total is
            input.value = calculatorValue.value1; // given to the first value. second operand is made empty
            calculatorValue.operator = event.target.textContent; // and the new operator replaces the old
            input.value += calculatorValue.operator;          // while waiting for the second operand
        }                                                    // to be given.

        else {
            calculatorValue.operator = event.target.textContent; //  // corrects a mistakenly typed operator
            input.value = input.value.slice(0, input.value.length-1) +  calculatorValue.operator;
        }
    
    } }

function equals() {
    result = operate(calculatorValue.value1, calculatorValue.operator, calculatorValue.value2);
    calculatorValue.total = result;
    input.value = result;
}

function resetCalc() {
    input.value = "";
    calculatorValue.value1 = "";
    calculatorValue.operator = "";
    calculatorValue.value2 = "";
    calculatorValue.total = null;
}
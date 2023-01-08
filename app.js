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
    if (operand2 == 0) {
        return 0;
    }
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

const calculatorValue = {value1: "", operator: "", value2: "", total: 0 };

const input = document.querySelector(".input");
const buttons = document.querySelectorAll("button");
for (let button of buttons) {
    button.addEventListener("click", (event) => {
        if (event.target.classList.contains("number")) {
            handleNumbers(event);
        }

        else if (event.target.classList.contains("operator")) {
            handleOperators(event);
        }

        else if (event.target.classList.contains("dot")) {
            addDot();
        }

        else if (event.target.classList.contains("reset")) {
            resetCalc();
        }

        else if (event.target.classList.contains("equal")) {
            equals();
        }

        else {
            del();
        }
    })
}
function addDot() {
    if (!calculatorValue.operator && !calculatorValue.value1.includes(".")) {
        calculatorValue.value1 += ".";
        input.textContent += ".";
        return;
    }
    if (calculatorValue.operator && !calculatorValue.value2.includes(".")) {
        calculatorValue.value2 += ".";
        input.textContent += ".";
    }
}

function del() {
    input.textContent = input.textContent.slice(0, input.textContent.length -1); // delete display value
    if (calculatorValue.value2) {
        calculatorValue.value2 = calculatorValue.value2.slice(0, calculatorValue.value2.length-1); //delete from variable
    }
    else if(calculatorValue.operator) {
        calculatorValue.operator = "";        
    }
    else {
        calculatorValue.value1 = calculatorValue.value1.slice(0, calculatorValue.value1.length-1);
    }
}

function handleNumbers(event) {
    if (!calculatorValue.operator) {
        calculatorValue.value1 += event.target.textContent;
        input.textContent += event.target.textContent;
    }
    else {
        calculatorValue.value2 += event.target.textContent;
        input.textContent += event.target.textContent;
    }
}

function handleOperators(event) {
    if (!calculatorValue.operator) { // if operator is pressed when no operation has been done.
        calculatorValue.operator = event.target.textContent;
        input.textContent += calculatorValue.operator;
    }
    else {
        if (calculatorValue.value2) { // when operator is pressed and two operands are already given
            let result = operate(calculatorValue.value1, calculatorValue.operator, calculatorValue.value2);
            result = Number.isInteger(result) ? result : +result.toFixed(4);
            calculatorValue.total += result;
            calculatorValue.value2 = "";
            calculatorValue.value1 = result;  // operation is done on the two operands and the total is
            input.textContent = calculatorValue.value1; // given to the first value. second operand is made empty
            calculatorValue.operator = event.target.textContent; // and the new operator replaces the old
            input.textContent += calculatorValue.operator;          // while waiting for the second operand
        }                                                    // to be given.

        else {
            calculatorValue.operator = event.target.textContent; //  // corrects a mistakenly typed operator
            input.textContent = input.textContent.slice(0, input.textContent.length-1) +  calculatorValue.operator;
        }
    
    } }

function equals() {
    let result = operate(calculatorValue.value1, calculatorValue.operator, calculatorValue.value2);
    result = Number.isInteger(result) ? result : +result.toFixed(4);
    calculatorValue.total = result;
    input.textContent = result;
}

function resetCalc() {
    input.textContent = "";
    calculatorValue.value1 = "";
    calculatorValue.operator = "";
    calculatorValue.value2 = "";
    calculatorValue.total = 0;
}
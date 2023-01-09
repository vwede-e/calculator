// global variables
const calculatorValue = {value1: "", operator: "", value2: "", total: null };
const input = document.querySelector(".input");
const buttons = document.querySelectorAll("button");
input.textContent = "0";

// event listeners
document.body.addEventListener("keydown", (event)=> {
    if (event.key === "Backspace") {
        del();
    }
    if (+event.key  >= 0 && +event.key <= 9) {
        handleNumbers(event);
    }
    if (event.key === "+" || event.key === "-" || event.key === "/" || event.key === "*") {
        event.preventDefault();
        handleOperators(event);
    }
    if (event.key === "Enter") {
        equals();
    }
    if (event.key === ".") {
        addDot();
    }
    if (event.key.toLowerCase() === "c") {
        resetCalc();
    }})

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
    }) }

// functions
function operate(operand1, operator, operand2) {
    switch (operator) {
        case "+":
            return +operand1 + +operand2;
        case "-":
           return +operand1 - +operand2;
        case "*":
            return +operand1 * +operand2;
        case "/":
            if (+operand2 === 0) {
                alert("ERROR! CAN'T DIVIDE BY ZERO");
                return 0;}
            return +operand1 / +operand2;
            break;
        case "":
            return +operand1;
            break;
        default:
            return "Enter a valid operator";
    } }

function addDot() {
    if (!calculatorValue.operator && !calculatorValue.value1.includes(".")) {
        calculatorValue.value1 += ".";
        input.textContent += ".";
        return;
    }
    if (calculatorValue.operator && !calculatorValue.value2.includes(".")) {
        calculatorValue.value2 += ".";
        input.textContent += ".";
    } }

function del() {
    if (calculatorValue.total !== null) {
        resetCalc();
        return;
    }
    input.textContent = input.textContent.slice(0, input.textContent.length -1); // delete display value
    if (calculatorValue.value2) {
        calculatorValue.value2 = calculatorValue.value2.slice(0, calculatorValue.value2.length-1); //delete from variable
    }
    else if(calculatorValue.operator) {
        calculatorValue.operator = "";        
    }
    else {
        calculatorValue.value1 = calculatorValue.value1.slice(0, calculatorValue.value1.length-1);
    } }

function handleNumbers(event) {
    const eventHandler = event.target === document.body ? event.key : event.target.textContent;
    if (calculatorValue.total !== null) { //reset calculator before starting new operation
        resetCalc();    
    }

    if (!calculatorValue.operator) { // if operator is absent
        calculatorValue.value1 += eventHandler; 
        if (input.textContent.length == 1 && input.textContent[0] == "0") { // check if output has only 0. If true, change output to inputed number
            input.textContent = eventHandler;
        }

        else {
        input.textContent +=  eventHandler; //if output has number other than 0, append the new input number to it
    } }

    else {
        calculatorValue.value2 += eventHandler; // if the operator is true, append number to the second operand
        input.textContent += eventHandler;
    } }

function handleOperators(event) {
    eventHandler = event.target === document.body ? event.key: event.target.textContent;
    if (!calculatorValue.operator) { // if there's no existing operator
        calculatorValue.operator = eventHandler; 
        input.textContent += calculatorValue.operator;
    }
    else {
        if (calculatorValue.total !== null) { // if operator already exists and total is not null
            calculatorValue.value1 = calculatorValue.total.toString();// give total to operand1 and empty total
            calculatorValue.total = null;
            calculatorValue.value2 = "";
            input.textContent = calculatorValue.value1 + eventHandler; // operator should change to new one
            calculatorValue.operator = eventHandler; // new operator should reflect on output
        }

        else if (calculatorValue.value2) { //if operator exists, total is null, and 2nd operand is not empty
            const result = equals();
            calculatorValue.value2 = ""; //if operator and 2nd operand is present and no ouput
            calculatorValue.value1 = result.toString(); //carry out the operation, give total to operand 1
            input.textContent = calculatorValue.total + eventHandler; //operator should change to new one
            calculatorValue.operator = eventHandler; // and should reflect on output
            calculatorValue.total = null;
        }

        else { // if only operator and first operand is given
            calculatorValue.operator = eventHandler; //  // corrects a mistakenly typed operator
            input.textContent = input.textContent.slice(0, input.textContent.length-1) +  calculatorValue.operator;
        } } }

function equals() {
    let result = operate(calculatorValue.value1, calculatorValue.operator, calculatorValue.value2);
    result = Number.isInteger(result) ? result : +result.toFixed(4);
    calculatorValue.total = result;
    input.textContent = result;
    return result; }

function resetCalc() {
    input.textContent = "0";
    calculatorValue.value1 = "";
    calculatorValue.operator = "";
    calculatorValue.value2 = "";
    calculatorValue.total = null; }
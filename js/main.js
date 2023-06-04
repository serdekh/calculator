import { calculator } from "./calculator.js";

let memory = 0;

const MAX_OUTPUT_LENGTH = 12;
const DEFAULT_INPUT_VALUE = '0';

const digits = [
    document.getElementById("digit-0"),
    document.getElementById("digit-1"),
    document.getElementById("digit-2"),
    document.getElementById("digit-3"),
    document.getElementById("digit-4"),
    document.getElementById("digit-5"),
    document.getElementById("digit-6"),
    document.getElementById("digit-7"),
    document.getElementById("digit-8"),
    document.getElementById("digit-9"),
];

const operations = [
    document.getElementById("operation-add"),
    document.getElementById("operation-divide"),
    document.getElementById("operation-subtract"),
    document.getElementById("operation-multiply")
];

const toggle = document.getElementById("toggle");
const percent = document.getElementById("percent");
const decimalDot = document.getElementById("decimal-dot");
const clearButton = document.getElementById("clear");
const creativeSqrt = document.getElementById("creative-sqrt");
const equalsButton = document.getElementById("equals");
const creativePower = document.getElementById("creative-power");
const expressionInput = document.getElementById("expressionInput");
const expressionOutput = document.getElementById("expressionOutput");
const creativeFactorial = document.getElementById("creative-factorial");
const creativeMemoryAdd = document.getElementById("creative-memory-add");
const creativeMemoryClear = document.getElementById("creative-memory-clear");
const creativeMemoryRecall = document.getElementById("creative-memory-recall");
const creativeMemoryOutput = document.getElementById("creative-memory-output");
const creativeMemorySubtract = document.getElementById("creative-memory-subtract");

const getExpressionOutputAsNumber = () => Number(expressionOutput.textContent);

const modifyMemory = (newValue = 0, update = true) => {
    memory = newValue;

    if (update) creativeMemoryOutput.textContent = memory.toString();
}

const setOperationsEnabled = (enabled = false) => {
    operations.forEach(element => {
        element.disabled = !enabled;
    });
}

const trySetEvaluatedExpression = (expression = expressionInput.textContent) => {
    const evaluation = calculator.evaluateExpression(expression);

    if (evaluation === 'NaN') return;

    expressionOutput.textContent = evaluation;

    if (expressionOutput.textContent.length > MAX_OUTPUT_LENGTH) {
        expressionOutput.style.fontSize = "small";
        return;
    }

    expressionOutput.style.fontSize = "larger";
}

digits.forEach(element => {
    element.onclick = (e) => {
        if (expressionInput.textContent === DEFAULT_INPUT_VALUE) expressionInput.textContent = '';
        expressionInput.textContent += e.srcElement.innerText;
        setOperationsEnabled(true);
        equalsButton.disabled = false;
    }
});

operations.forEach(element => {
    element.onclick = (e) => {
        expressionInput.textContent += ' ' + e.srcElement.innerText + ' ';
        equalsButton.disabled = true;
    }
});

equalsButton.onclick = () => trySetEvaluatedExpression();

expressionInput.addEventListener("input", (event) => trySetEvaluatedExpression(event.target.value));

clearButton.onclick = () => {
    expressionInput.textContent = DEFAULT_INPUT_VALUE;
    expressionOutput.textContent = DEFAULT_INPUT_VALUE;
}

decimalDot.onclick = () => {
    expressionInput.textContent += '.';
    setOperationsEnabled(operations, false);
}

percent.onclick = () => {
    trySetEvaluatedExpression();
    expressionInput.textContent = expressionOutput.textContent;
    expressionInput.textContent += ' * 1 / 100';
    trySetEvaluatedExpression();
}

creativeSqrt.onclick = () => {
    trySetEvaluatedExpression();

    const number = Number(expressionInput.textContent);

    if (number === 'NaN') return;

    trySetEvaluatedExpression(Math.sqrt(number).toString());
}

creativeFactorial.onclick = () => {
    trySetEvaluatedExpression();

    const number = Number(expressionInput.textContent);

    if (!Number.isInteger(number)) return;

    trySetEvaluatedExpression(calculator.factorial(number).toString());

    expressionInput.textContent = expressionOutput.textContent;
}

toggle.onclick = () => {
    trySetEvaluatedExpression();

    expressionInput.textContent = expressionOutput.textContent;

    let toBeToggled = Number(expressionInput.textContent);

    if (typeof (toBeToggled) === 'NaN') return;

    toBeToggled *= -1;

    expressionInput.textContent = toBeToggled.toString();

    trySetEvaluatedExpression();
}

creativePower.onclick = () => {
    trySetEvaluatedExpression();

    const number = Number(expressionInput.textContent);

    if (number === 'NaN') return;

    let power;

    while (true) {
        power = prompt('Enter power: ');

        if (Number(power) != 'NaN') break;
    }

    trySetEvaluatedExpression(Math.pow(number, Number(power)).toString());
}

creativeMemoryAdd.onclick = () => modifyMemory(memory + getExpressionOutputAsNumber());
creativeMemoryClear.onclick = () => modifyMemory(0);
creativeMemoryRecall.onclick = () => modifyMemory(getExpressionOutputAsNumber());
creativeMemorySubtract.onclick = () => modifyMemory(memory - getExpressionOutputAsNumber());







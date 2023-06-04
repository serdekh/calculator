const stringToArray = (arr) => arr.trim().split(/\s+/g);

export class Calculator {
    constructor(defaultExpression) {
        if (!defaultExpression) {
            this.expression = '0';
            return;
        }

        this.expression = defaultExpression;
    }

    #callOperation(operation, x) {
        if (typeof (x) === 'number') {
            this.expression += ' ' + operation + ' ' + x.toString();
            return;
        }

        if (typeof (Number(x)) !== 'number') return;

        this.expression += ' ' + operation + ' ' + x;
    }

    add(x) {
        this.#callOperation('+', x);
        return this;
    }

    subtract(x) {
        this.#callOperation('-', x);
        return this;
    }

    multiply(x) {
        this.#callOperation('*', x);
        return this;
    }

    divide(x) {
        if (x === 0 || x === '0') return;

        this.#callOperation('/', x);
        return this;
    }

    log() {
        console.log(this.expression);
    }

    /* arr = [..., i - 1, i, i + 1, ...] => [..., v, ...] */
    #replaceThreeElementsWithOne(arr, i = 0, v = undefined) {
        if (!arr) return;

        arr.splice(i, 1);
        arr.splice(i, 1);
        arr.splice(i - 1, 1);
        arr.splice(i - 1, 0, v);
    }

    /* looks for the first <operand> <operation> <operand> struct and evaluates it */
    #evaluateFirst(arr, isLowPriority = false) {
        if (!arr) return;

        let changed = false;

        let operand1 = isLowPriority ? '+' : '*';
        let operand2 = isLowPriority ? '-' : '/';

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== operand1 && arr[i] !== operand2) continue;

            let leftOperand = Number(arr[i - 1]);
            let rightOperand = Number(arr[i + 1]);
            let result = 0;

            isLowPriority ?
                result = arr[i] === '+' ? leftOperand + rightOperand : leftOperand - rightOperand :
                result = arr[i] === '*' ? leftOperand * rightOperand : leftOperand / rightOperand;

            this.#replaceThreeElementsWithOne(arr, i, result.toString());

            changed = true;
            break;
        }

        return changed;
    }


    #evaluateAll(arr) {
        const evaluateOneOfPriorities = (arr, isLowPriority) => {
            let changed = true;

            while (changed) {
                changed = this.#evaluateFirst(arr, isLowPriority);
            }
        }

        evaluateOneOfPriorities(arr, false); // first of all, for high level (*, /). 2 + 4 * 2 => 2 + 8
        evaluateOneOfPriorities(arr, true); // second, for a low level (+, -) 2 + 8 => 10

        return arr[0];
    }

    evaluateExpression(expression) {
        let expressionArray = stringToArray(expression ? expression : this.expression);
        let result = this.#evaluateAll(expressionArray);
        return result;
    }

    logResult() {
        console.log(this.evaluateExpression());
    }

    clear() {
        this.expression = '0';
        return this;
    }

    factorial(x = 0) {
        if (x <= 0) return 0;

        let xcopy = 1;

        for (let i = 1; i <= x; i++) {
            xcopy *= i;
        }

        return xcopy;
    }
}

export const calculator = new Calculator();
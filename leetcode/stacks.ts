// Stack Problems

const isValid = (s: string): boolean => {
  let stack: string[] = [];
  const closeToOpen = { ')': '(', ']': '[', '}': '{' };

  for (let c of s) {
    if (closeToOpen[c]) {
      if (stack.length > 0 && stack[stack.length - 1] === closeToOpen[c]) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      stack.push(c);
    }
  }

  return stack.length === 0;
};

class MinStack {
  stack: number[];
  minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val: number): void {
    if (this.stack.length > 0) this.stack.push(val);

    if (
      this.minStack.length === 0 ||
      val <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(val);
    }
  }

  pop(): void {
    const popped = this.stack.pop();
    if (popped == this.minStack[this.minStack.length - 1]) this.minStack.pop();
  }

  top(): number | undefined {
    if (this.stack.length > 0) return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}

function calPoints(operations: string[]) {
  let stack: number[] = [];

  for (let op of operations) {
    let n = stack.length - 1;
    if (op === '+') {
      let res = stack[n] + stack[n - 1];
      stack.push(Number(res));
    } else if (op === 'D') {
      let res = stack[n] * 2;
      stack.push(Number(res));
    } else if (op === 'C') {
      stack.pop();
    } else {
      stack.push(Number(op));
    }
  }

  let sum = 0;

  for (const num of stack) {
    sum += num;
  }

  return sum;
}

function validParentheses(s: string[]) {
  const stack: string[] = [];
  const closeToOpen = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  for (let c of s) {
    const n = stack.length;
    if (closeToOpen[c]) {
      if (n > 0 && stack[n - 1] === closeToOpen[c]) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
}

class evalRPN {
  evalRPN(tokens: string[]) {
    let stack: number[] = [];

    for (let i = 0; i < tokens.length; i++) {
      if (isNaN(Number(tokens[i]))) {
        let n2 = stack.pop();
        let n1 = stack.pop();

        if (n1 === undefined || n2 === undefined) {
          throw new Error('Invalid RPN expression: not enough operands.');
        }

        let resultToAdd = this.calculate(n1, n2, tokens[i]);
        stack.push(resultToAdd);
      } else {
        stack.push(Number(tokens[i]));
      }
    }

    return stack.pop();
  }

  calculate(num1: number, num2: number, operator: string) {
    if (operator === '+') {
      return num1 + num2;
    } else if (operator === '-') {
      return num1 - num2;
    } else if (operator === '*') {
      return num1 * num2;
    } else {
      return Math.trunc(num1 / num2);
    }
  }
}
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

function asteroidCollision(asteroids: number[]) {
  let stack: number[] = [];

  for (let a of asteroids) {
    if (a > 0) {
      stack.push(a);
    } else {
      let survived = true;
      while (stack.length > 0 && stack[stack.length - 1] > 0) {
        let top = stack[stack.length - 1];

        // Meaning the incoming asteroid is bigger
        // than our current top, so we destroy it
        if (Math.abs(a) > top) {
          stack.pop();
          // The current top we have is bigger
          // than the incoming asteroid, so nothing
          // happens in our logic, we just break out
        } else if (Math.abs(a) < top) {
          survived = false;
          break;
          // Meaning they're equal, so both get destroyed
        } else {
          stack.pop();
          survived = false;
          break;
        }
      }
      if (survived) {
        stack.push(a);
      }
    }
  }
  return stack;
}

function carFleet(target: number, position: number[], speed: number[]) {
  const pairs: number[][] = [];
  for (let i = 0; i < position.length; i++) {
    pairs.push([position[i], speed[i]]);
  }

  pairs.sort((a, b) => b[0] - a[0]);

  let stack: number[] = [];
  for (const [p, s] of pairs) {
    stack.push((target - p) / 2);

    if (
      stack.length > 2 &&
      stack[stack.length - 1] <= stack[stack.length - 2]
    ) {
      stack.pop();
    }
  }

  return stack.length;
}

function dailyTemperatures(temperatures: number[]) {
  const n = temperatures.length;
  const res: number[] = new Array(n).fill(0);
  const stack: number[][] = []; // Pair: [temp, index]

  for (let i = 0; i < n; i++) {
    const t = temperatures[i];

    while (stack.length > 0 && t > stack[stack.length - 1][0]) {
      const popped = stack.pop();

      if (popped) {
        const [stackT, stackIndex] = popped;
        res[stackIndex] = i - stackIndex;
      }
    }
    stack.push([t, i]);
  }

  return res;
}

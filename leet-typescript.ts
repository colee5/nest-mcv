const removeDuplicates = (nums: number[]) => {
  let n = nums.length;
  let l = 0;
  let r = 0;

  while (r < n) {
    nums[l] = nums[r];
    while (r < n && nums[l] === nums[r]) {
      r++;
    }
    l++;
  }
  return l;
};

//

const removeElement = (nums: number[], val: number) => {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[k]) {
      nums[i] = nums[k];
      k++;
    }
  }
  return k;
};

//

const concatElement = (nums: number[]) => {
  let n = nums.length;
  let ans = new Array(n * 2);

  for (let i = 0; i < n; i++) {
    ans[i] = nums[i];
    ans[i + n] = nums[i];
  }

  return ans;
};

//

const isValid = (s: string): boolean => {
  let stack: string[] = [];
  const closeToOpen = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

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

//

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

//

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let previous: ListNode | null = null;
  let current = head;

  while (current) {
    let nextNode = current.next;
    current.next = previous;

    previous = current;
    current = nextNode;
  }
  return previous;
}

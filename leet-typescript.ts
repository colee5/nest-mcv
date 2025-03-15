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

//

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  let dummy = new ListNode(0, null);
  let current: ListNode = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  if (list1) current.next = list1;
  if (list2) current.next = list2;

  return dummy.next;
}

//

class DoublyLinkedList {
  val: number;
  next: DoublyLinkedList | null;
  prev: DoublyLinkedList | null;
  constructor(
    val?: number,
    next?: DoublyLinkedList | null,
    prev?: DoublyLinkedList,
  ) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.prev = prev === undefined ? null : prev;
  }
}

class DoublyListNode {
  val: number;
  next: DoublyListNode | null;
  prev: DoublyListNode | null;

  constructor(val?: number) {
    this.val = val === undefined ? 0 : val;
    this.next = null;
    this.prev = null;
  }
}

// class MyLinkedList {
//   head: DoublyListNode | null;
//   tail: DoublyListNode | null;

//   constructor() {
//     this.head = null;
//     this.tail = null;
//   }

//   get(index: number): number {
//     if (index < 0 || this.head === null) {
//       return -1;
//     }

//     let curr = this.head;
//     let i = 0;

//     while (curr) {
//       if (i === index) {
//         return curr.val;
//       }

//       i++;
//       curr = curr.next;
//     }
//     return -1;
//   }

//   addAtHead(val: number): void {
//     const newNode = new DoublyListNode(val);

//     if (this.head === null) {
//       this.head = newNode;
//       this.tail = newNode;
//     } else {
//       newNode.next = this.head;
//       this.head.prev = newNode;
//       this.head = newNode;
//     }
//   }

//   addAtTail(val: number): void {
//     const newNode = new DoublyListNode(val);
//     if (this.tail === null) {
//       this.head = newNode;
//       this.tail = newNode;
//     } else {
//       this.tail.next = newNode;
//       newNode.prev = this.tail;
//       this.tail = newNode;
//     }
//   }

//   addAtIndex(index: number, val: number): void {
//     if (index < 0) {
//       return;
//     }

//     if (index === 0) {
//       this.addAtHead(val);
//       return;
//     }

//     const newNode = new DoublyListNode(val);
//     let currentAtIndex = this.head;

//     if (currentAtIndex === null) {
//       return;
//     }

//     for (let i = 0; i < index; i++) {
//       if (currentAtIndex === null) {
//         return;
//       }
//       currentAtIndex = currentAtIndex.next;
//     }

//     if (currentAtIndex === null) {
//       this.addAtTail(val);
//       return;
//     }

//     newNode.next = currentAtIndex;
//     newNode.prev = currentAtIndex.prev;
//     currentAtIndex.prev.next = newNode;
//     currentAtIndex.prev = newNode;
//   }

//   deleteAtIndex(index: number): void {
//     if (index < 0 || this.head === null) {
//       return;
//     }

//     if (index === 0) {
//       this.head = this.head.next;
//       if (this.head) {
//         this.head.prev = null;
//       } else {
//         this.tail = null;
//       }
//       return;
//     }

//     let currentAtIndex = this.head;
//     for (let i = 0; i < index; i++) {
//       if (currentAtIndex === null) {
//         return;
//       }
//       currentAtIndex = currentAtIndex.next;
//     }

//     if (currentAtIndex === null) {
//       return;
//     }

//     if (currentAtIndex === this.tail) {
//       this.tail = currentAtIndex.prev;
//       if (this.tail) {
//         this.tail.next = null;
//       } else {
//         this.head = null;
//       }
//       return;
//     }

//     currentAtIndex.prev.next = currentAtIndex.next;
//     currentAtIndex.next.prev = currentAtIndex.prev;
//   }
// }

const countStudents = (students: number[], sandwiches: number[]): number => {
  let remainingStudents = students.length;
  let queue: number[] = [];

  for (let student of students) {
    queue.push(student);
  }

  for (let sandwich of sandwiches) {
    let studentsChecked = 0;

    while (studentsChecked < queue.length && queue[0] !== sandwich) {
      let student = queue.shift()!;
      queue.push(student);
      studentsChecked++;
    }

    if (queue[0] === sandwich) {
      queue.shift();
      remainingStudents--;
    } else {
      break;
    }
  }

  return remainingStudents;
};

const climbStairs = (n: number) => {
  let one = 1;
  let two = 1;

  for (let i = 0; i < n - 1; i++) {
    let temporary = one;
    one = one + two;
    two = temporary;
  }

  return one;
};

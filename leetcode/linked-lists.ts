// Linked List Problems

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

function hasCycle(head: ListNode | null): boolean {
  let visited = new Set();
  let curr = head;

  while (curr) {
    if (visited.has(curr)) {
      return true;
    }

    visited.add(curr);
    curr = curr.next;
  }

  return false;
}

class LinkedList {
  head: ListNode;
  tail: ListNode;

  constructor() {
    this.head = new ListNode(-1);
    this.tail = this.head;
  }

  get(index: number) {
    let curr = this.head.next;
    let i = 0;

    while (curr) {
      if (i === index) {
        return curr.val;
      }

      i++;
      curr = curr.next;
    }
    return -1;
  }

  insertHead(val: number) {
    const newNode = new ListNode(val);
    newNode.next = this.head.next;

    this.head.next = newNode;

    if (!newNode.next) {
      this.tail = newNode;
    }
  }

  insertTail(val: number) {
    this.tail.next = new ListNode(val);
    this.tail = this.tail.next;
  }

  remove(index: number) {
    let i = 0;
    let curr = this.head.next;

    while (curr && i < index) {
      i++;
      curr = curr.next;
    }

    if (curr && curr.next) {
      if (curr.next === this.tail) {
        this.tail = curr;
      }

      curr.next = curr.next.next;
      return true;
    }

    return false;
  }

  getValues() {
    let curr = this.head.next;
    let res: number[] = [];

    while (curr) {
      res.push(curr?.val);
      curr = curr.next;
    }

    return res;
  }
}

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

class MyLinkedList {
  head: DoublyListNode | null;
  tail: DoublyListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  get(index: number): number {
    if (index < 0 || this.head === null) {
      return -1;
    }

    let curr = this.head;
    let i = 0;

    while (curr) {
      if (i === index) {
        return curr.val;
      }

      i++;

      if (curr.next) {
        curr = curr.next;
      }
    }
    return -1;
  }

  addAtHead(val: number): void {
    const newNode = new DoublyListNode(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  addAtTail(val: number): void {
    const newNode = new DoublyListNode(val);
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  addAtIndex(index: number, val: number): void {
    if (index < 0) {
      return;
    }

    if (index === 0) {
      this.addAtHead(val);
      return;
    }

    const newNode = new DoublyListNode(val);
    let currentAtIndex = this.head;

    if (currentAtIndex === null) {
      return;
    }

    for (let i = 0; i < index; i++) {
      if (currentAtIndex === null) {
        return;
      }
      currentAtIndex = currentAtIndex.next;
    }

    if (currentAtIndex === null) {
      this.addAtTail(val);
      return;
    }

    newNode.next = currentAtIndex;
    newNode.prev = currentAtIndex.prev;
    if (currentAtIndex.prev) {
      currentAtIndex.prev.next = newNode;
    }

    currentAtIndex.prev = newNode;
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || this.head === null) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      return;
    }

    let currentAtIndex = this.head;
    for (let i = 0; i < index; i++) {
      if (currentAtIndex === null) {
        return;
      }
      if (currentAtIndex.next) {
        currentAtIndex = currentAtIndex.next;
      }
    }

    if (currentAtIndex === null) {
      return;
    }

    if (currentAtIndex === this.tail) {
      this.tail = currentAtIndex.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      return;
    }

    if (currentAtIndex.next && currentAtIndex.prev) {
      currentAtIndex.prev.next = currentAtIndex.next;
      currentAtIndex.next.prev = currentAtIndex.prev;
    }
  }
}

function reorderList(head: ListNode | null) {
  if (!head || !head.next) {
    return;
  }

  let curr: ListNode | null = head;
  let length: number = 0;

  while (curr) {
    length++;
    curr = curr.next;
  }

  let middlePosition = Math.floor(length / 2);
  let middleNode: ListNode = head;

  for (let i = 0; i < middlePosition; i++) {
    if (middleNode && middleNode.next) {
      middleNode = middleNode.next;
    }
  }

  let firstHalf = head;
  let secondHalf = middleNode.next;
  middleNode.next = null;

  let prev: ListNode | null = null;
  let current = secondHalf;
  let next: ListNode | null = null;

  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  secondHalf = prev;

  let p1: ListNode | null = firstHalf;
  let p2: ListNode | null = secondHalf;
  let temp1: ListNode | null;
  let temp2: ListNode | null;

  while (p1 && p2) {
    temp1 = p1.next;
    temp2 = p2.next;

    p1.next = p2;

    if (temp1) {
      p2.next = temp1;
    }

    p1 = temp1;
    p2 = temp2;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number) {
  if (head === null) {
    return null;
  }

  let curr: ListNode | null = head;
  let count = 0;

  while (curr) {
    count++;
    curr = curr.next;
  }

  let lastNth = count - n;

  if (lastNth == 0) {
    return head.next;
  }

  let current: ListNode | null = head;
  let position = 0;

  while (position < lastNth - 1 && current !== null) {
    current = current.next;
    position++;
  }

  if (current !== null && current.next !== null) {
    current.next = current.next.next;
  }

  return head;
}

class NodeWithRandom {
  val: number;
  next: NodeWithRandom | null;
  random: NodeWithRandom | null;

  constructor(val: number, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

class DeepCopyLinkedList {
  copyRandomList(head: NodeWithRandom | null) {
    let map = new Map();
    map.set(null, null);

    let curr = head;
    while (curr) {
      let copy = new NodeWithRandom(curr.val);
      map.set(curr, copy);
      curr = curr.next;
    }

    curr = head;
    while (curr) {
      let copy = map.get(curr);
      copy.next = map.get(curr.next);
      copy.random = map.get(curr.random);
      curr = curr.next;
    }

    return map.get(head);
  }
}

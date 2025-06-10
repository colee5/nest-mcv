import { Deque } from '@datastructures-js/deque';

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
// 141. Linked List Cycle

function hasCycle(head: ListNode | null): boolean {
  let visited = new Set();
  // We can directly work with head, this is just
  // A design decision
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

//
// Designing a Singly Linked List

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

//

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

//

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

//

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

//

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

//

function insertionSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;

    while (j >= 0 && arr[j + 1] < arr[j]) {
      let tmp = arr[j + 1];
      arr[j + 1] = arr[j];
      arr[j] = tmp;
      j--;
    }
  }
}

//

function sortColors(nums: number[]): void {
  const counts = new Int32Array(3);

  for (let i = 0; i < nums.length; i++) {
    counts[nums[i]] += 1;
  }

  let i = 0;
  for (let n = 0; n < counts.length; n++) {
    for (let j = 0; j < counts[n]; j++) {
      nums[i] = n;
      i++;
    }
  }
}

//

function rotateArray(nums: number[], k: number): number[] {
  if (nums.length === 0) return nums;

  k = k % nums.length;
  if (k === 0) return nums;

  const result = [...nums];

  reverse(result, 0, result.length - 1);
  reverse(result, 0, k - 1);
  reverse(result, k, result.length - 1);

  return result;
}

//

function reverse(arr: number[], start: number, end: number): void {
  while (start < end) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}

//

function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) return 0;

  let maxLength = 0;
  let left = 0;
  const charMap = new Map<string, number>();

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    if (charMap.has(currentChar) && charMap.get(currentChar)! >= left) {
      left = charMap.get(currentChar)! + 1;
    }

    maxLength = Math.max(maxLength, right - left + 1);

    charMap.set(currentChar, right);
  }

  return maxLength;
}

//

function searchMatrix(matrix: number[][], target: number): boolean {
  const arr: number[] = matrix.flat();
  let L: number = 0;
  let R: number = arr.length - 1;

  while (L <= R) {
    let mid: number = Math.floor((L + R) / 2);

    if (target > arr[mid]) {
      L = mid + 1;
    } else if (target < arr[mid]) {
      R = mid - 1;
    } else {
      return true;
    }
  }

  return false;
}

//

function guessNumber(n: number): number {
  let left = 1;
  let right = n;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let result = guess(mid);

    if (result === 0) {
      return mid;
    } else if (result === -1) {
      right = mid + 1;
    } else {
      left = mid - 1;
    }
  }
  return -1;
}

function guess(num: number): number {
  return -1;
}

//

function isBadVersion(num: number): number {
  return -1;
}

//

function firstBadVersion(n: number): number {
  let l = 1,
    r = n,
    res = -1;
  while (l <= r) {
    const m = Math.floor(l + (r - l) / 2);
    if (isBadVersion(m)) {
      res = m;
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  return res;
}

//

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

//

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) {
    return null;
  }

  if (val > root.val) {
    return searchBST(root.right, val);
  } else if (val < root.val) {
    return searchBST(root.left, val);
  } else {
    return root;
  }
}

//

function minValueNode(root: TreeNode) {
  let curr = root;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

//

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) {
    return new TreeNode(val);
  }

  if (val > root.val) {
    root.right = insertIntoBST(root.right, val);
  } else if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  }

  return root;
}

//

function remove(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) {
    return null;
  }

  if (val > root.val) {
    root.right = remove(root.right, val);
  } else if (val < root.val) {
    root.left = remove(root.left, val);
  } else {
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    } else {
      let minNode = minValueNode(root.right);
      root.val = minNode.val;
      root.right = remove(root.right, minNode.val);
    }
  }

  return root;
}

//

function inorder(root: TreeNode | null) {
  if (root == null) {
    return;
  }

  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}

//

function inorderTraversal(root: TreeNode | null) {
  const res: number[] = [];

  const inorder = (node: TreeNode | null) => {
    if (!node) return;
    inorder(node.left);
    res.push(node.val);
    inorder(node.right);
  };

  inorder(root);
  return res;
}

//

function bfs(root: TreeNode | null): void {
  // Initialize an empty queue to store nodes that need to be visited
  // QUEUE - FIFO
  let queue: TreeNode[] = [];

  // If the root exists, add it to the queue to begin traversal
  if (root !== null) {
    queue.push(root);
  }

  let level = 0;

  // Continue traversal as long as there are nodes in the queue
  while (queue.length > 0) {
    console.log('level' + level + ': ');

    // Store the number of nodes at the current level
    // (important to capture this before the queue size changes)
    let levelLength = queue.length;

    for (let i = 0; i < levelLength; i++) {
      let curr = queue.shift()!;
      console.log(curr.val + '');

      if (curr.left !== null) {
        queue.push(curr.left);
      }

      if (curr.right !== null) {
        queue.push(curr.right);
      }
    }

    level++;
    console.log();
  }
}

//
// Same as above just return an output: [[1,2], [4,5], [5,6]]

function levelOrder(root: TreeNode | null) {
  let queue: TreeNode[] = [];

  if (root !== null) {
    queue.push(root);
  }

  let finalArray: number[][] = [];

  while (queue.length > 0) {
    let levelLength = queue.length;
    let currentLevel: number[] = [];

    for (let i = 0; i < levelLength; i++) {
      let curr = queue.shift()!;
      currentLevel.push(curr.val);

      if (curr.left !== null) {
        queue.push(curr.left);
      }

      if (curr.right !== null) {
        queue.push(curr.right);
      }
    }
    finalArray.push(currentLevel);
  }

  return finalArray;
}

//

function rightSideView(root: TreeNode) {
  let queue: TreeNode[] = [];

  if (root !== null) {
    queue.push(root);
  }

  let finalArray: number[] = [];
  while (queue.length > 0) {
    let levelLength = queue.length;

    for (let i = 0; i < levelLength; i++) {
      let curr = queue.shift();
      if (curr) {
        finalArray.push(curr.val);
      }

      if (curr && curr.right !== null) {
        queue.push(curr.right);
      }
    }
  }
}

// Implementation of a tree using a map, difference is the "key"

class TreeMap {
  key: number;
  val: number;
  left: TreeMap | null;
  right: TreeMap | null;

  constructor(key: number, value: number) {
    this.key = key;
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

class TreeMapClass {
  root: TreeMap | null;

  constructor() {
    this.root = null;
  }

  insert(key: number, val: number): void {
    let newNode = new TreeMap(key, val);
    if (this.root == null) {
      this.root = newNode;
      return;
    }

    let curr = this.root;
    while (true) {
      // We go left, check if left exists, if not put that newNode as the left
      if (key < curr.key) {
        if (!curr.left) {
          curr.left = newNode;
          return;
        }
        curr = curr.left;
      }
      // We go right, check if right exists, if not put that newNode as the right
      else if (key > curr.key) {
        if (!curr.right) {
          curr.right = newNode;
          return;
        }
        curr = curr.right;
      } else {
        // === key, we just replace the value
        curr.val = val;
        return;
      }
    }
  }

  get(key: number): number {
    let curr = this.root;
    while (curr !== null) {
      if (key < curr.key) {
        curr = curr.left;
      } else if (key > curr.key) {
        curr = curr.right;
      } else {
        return curr.val;
      }
    }
    return -1;
  }

  getMin(): number {
    let curr = this.findMin(this.root);
    return curr !== null ? curr.val : -1;
  }

  getMax(): number {
    let curr = this.root;
    while (curr !== null && curr.right !== null) {
      curr = curr.right;
    }
    return curr !== null ? curr.val : -1;
  }

  remove(key: number): void {
    this.root = this.removeHelper(this.root, key);
  }

  // Remove the node with key, but also return the new root of the subtree after removal
  private removeHelper(curr: TreeMap | null, key: number): TreeMap | null {
    if (curr == null) {
      return null;
    }

    if (key > curr.key) {
      curr.right = this.removeHelper(curr.right, key);
    } else if (key < curr.key) {
      curr.left = this.removeHelper(curr.left, key);
    } else {
      // This is actually where we do the deletion, because we have found the one we want to remove
      if (curr.left == null) {
        return curr.right;
      } else if (curr.right == null) {
        return curr.left;
      } else {
        // Meaning the tree node has both left and right child
        // Swap curr with inorder successor.
        let minNode = this.findMin(curr.right)!;
        curr.key = minNode.key;
        curr.val = minNode.val;
        curr.right = this.removeHelper(curr.right, minNode.key);
      }
    }
    return curr;
  }

  private findMin(node: TreeMap | null): TreeMap | null {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  private inorderTraversal(root: TreeMap | null, result: number[]): void {
    if (root != null) {
      this.inorderTraversal(root.left, result);
      result.push(root.key);
      this.inorderTraversal(root.right, result);
    }
  }

  getInorderKeys(): number[] {
    let result: number[] = [];
    this.inorderTraversal(this.root, result);
    return result;
  }
}

//

function removeDuplicatesReturnCount(nums: number[]): number {
  if (!nums.length) return 0;

  let n = nums.length;
  let l = 0;
  let r = 0;

  while (r < n) {
    nums[l] = nums[r];
    while (r < n && nums[r] === nums[l]) {
      r++;
    }
    l++;
  }

  return l;
}

//

function twoSum(nums: number[], target: number): number[] {
  const seen: { [key: number]: number } = {};

  // Iterate through the array with index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (complement in seen) {
      return [seen[complement], i];
    }

    seen[nums[i]] = i;
  }

  return [];
}

//

class MinHeap {
  heap: number[];

  heapify(arr: number[]) {
    arr.push(arr[0]);
    this.heap = arr;

    let curr = Math.floor((this.heap.length - 1) / 2);
    while (curr > 0) {
      let i = curr;

      while (2 * i < this.heap.length) {
        if (
          2 * i + 1 < this.heap.length &&
          this.heap[2 * i + 1] < this.heap[2 * i] &&
          this.heap[i] > this.heap[2 * i + 1]
        ) {
          let tmp = this.heap[i];
          this.heap[i] = this.heap[2 * i + 1];
          this.heap[2 * i + 1] = tmp;
          i = 2 * i + 1;
        } else if (this.heap[i] > this.heap[2 * i]) {
          let tmp = this.heap[i];
          this.heap[i] = this.heap[2 * i];
          this.heap[2 * i] = tmp;
          i = 2 * i;
        } else {
          break;
        }
      }
      curr--;
    }
    return;
  }
}

//

class Heap {
  heap: number[];

  heapify(arr: number[]) {
    arr.push(arr[0]);
    this.heap = arr;

    let curr = Math.floor((this.heap.length - 1) / 2);
    while (curr > 0) {
      let i = curr;

      while (2 * i < this.heap.length) {
        if (
          2 * i + 1 < this.heap.length &&
          this.heap[2 * i + 1] < this.heap[2 * i] &&
          this.heap[i] > this.heap[2 * i + 1]
        ) {
          let tmp = this.heap[i];
          this.heap[i] = this.heap[2 * i + 1];
          this.heap[2 * i + 1] = tmp;
          i = 2 * i + 1;
        } else if (this.heap[i] > this.heap[2 * i]) {
          let tmp = this.heap[i];
          this.heap[i] = this.heap[2 * i];
          this.heap[2 * i] = tmp;
          i = 2 * i;
        } else {
          break;
        }
      }
      curr--;
    }
    return;
  }
}

//

function isAnagram(s: string, t: string) {
  if (s.length !== t.length) {
    return false;
  }

  const countS = {};
  const countT = {};

  for (let i = 0; i < s.length; i++) {
    countS[s[i]] = (countS[s[i]] || 0) + 1;
    countT[t[i]] = (countT[t[i]] || 0) + 1;
  }

  for (const key in countS) {
    if (countS[key] !== countT[key]) {
      return false;
    }
  }
  return true;
}

//

function groupAnagrams(strs: string[]): string[][] {
  const map = new Map();

  for (const str of strs) {
    // We first split all the characters into an array of ["e", "a", "t"]
    // then we .sort() which sorts them alphabetically. Then we join them
    // The thing is then all word combinations of those characters will
    // end up with "a, e ,t"

    const sortedStr = str.split('').sort().join();

    // If our map doesn't yet have that key in it, we store it as a brand new
    // We say: store an entry with key sortedStr, and initialize an empty array
    // which we'll use to .push afterwards
    // NOTE: we also can use an object instead of an array, there's a bit of a difference
    // in the implementation, and in the end we'll say return Object.values(result);

    if (!map.has(sortedStr)) {
      map.set(sortedStr, []);
    }

    // Otherwise, we first get that entry in the map by our key, sortedStr, and
    // we add our new word in it (the original one) and we'll get something like
    // we'll get something like "aet": ['eat','tea','ate']

    map.get(sortedStr).push(str);
  }

  // In the end, we make an array of only the values of the original stored words:
  // FROM THIS:
  // "aet": ["eat", "tea", "ate"]
  // "ant": ["tan", "nat"]
  // "abt": ["bat"]

  // WE OUTPUT THIS:
  // [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]

  return Array.from(map.values());
}

//

function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map();

  for (const num of nums) {
    // If this entry still hasn't been initialized, we make the key as the num and set the
    // count of the numbers to 0.
    if (!map.has(num)) {
      map.set(num, 0);
    }

    // We first get the count of the val by accessing it with the key
    // And then we increment it by 1
    const val = map.get(num) || 0;
    map.set(num, val + 1);
  }

  // We get all the entries by creating an array, which will look like
  // First element is they key and then next to it is the count, but in an array format
  // [
  //   [1, 3],
  //   [3, 1]
  //   [2, 2],
  // ]

  const entries = Array.from(map.entries());

  // will sort the array of entries in descending order based on the
  // frequency values (the second element in each pair). In our case,
  // 1 would be first, 2 would be the second and 3 would be the last
  // in terms of how many times it's mentioned
  // the input was [1,1,1,2,2,3]

  entries.sort((a, b) => b[1] - a[1]);

  // We take only the first k elements, if k is 2 that would be this:
  // [
  //   [1, 3],
  //   [2, 2],
  // ]

  // .map((entry) => entry[0]) only give us the first element, without the count
  // and store that in a result, which we then return, pretty cool

  const result = entries.slice(0, k).map((entry) => entry[0]);
  return result;
}

//

// MATRIX BFS

let grid = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 1],
  [0, 1, 0, 0],
];

let visit = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// Count Paths (backtradcking)
function dfs(grid: number[][], r: number, c: number, visit: number[][]) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  if (
    r < 0 ||
    c < 0 ||
    r === ROWS ||
    c === COLS ||
    visit[r][c] === 1 ||
    grid[r][c] === 1
  ) {
    return 0;
  }
  if (r === ROWS - 1 && c === COLS - 1) {
    return 1;
  }

  visit[r][c] = 1;
  let count = 0;
  count += dfs(grid, r + 1, c, visit); // down
  count += dfs(grid, r - 1, c, visit); // up
  count += dfs(grid, r, c + 1, visit); // right
  count += dfs(grid, r, c - 1, visit); // left

  visit[r][c] = 0;
  return count;
}

console.log(dfs(grid, 0, 0, visit));

// same algo but with a helper

function countPaths(grid: number[][]) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  function helper(r: number, c: number, visit: Set<string>) {
    if (
      Math.min(r, c) < 0 ||
      r === ROWS ||
      c === COLS ||
      visit.has(`${r}-${c}`) ||
      grid[r][c] === 1
    ) {
      return 0;
    }
    if (r === ROWS - 1 && c === COLS - 1) {
      return 1;
    }

    visit.add(`${r}-${c}`);
    let count = 0;

    count += helper(r + 1, c, new Set()); // down
    count += helper(r - 1, c, new Set()); // up
    count += helper(r, c + 1, new Set()); // right
    count += helper(r, c - 1, new Set()); // left

    visit.delete(`${r}-${c}`);
    return count;
  }

  return helper(0, 0, new Set());
}

// Binary search, range
// 153. Find Minimum in Rotated Sorted Array

function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Checking if the middle element is greater than the most right element
    // In normal sorted arrays this can not happen. But since we are working with
    // rotated arrays it can happen.
    if (nums[mid] > nums[right]) {
      // In that case we put the left point to be 1+ of mid
      // So we continue searching the right part of the array
      left = mid + 1;
    } else {
      // If that's not the case, we put our right pointer to where mid is
      // And we continue searching the left portion of the array.
      right = mid;
    }
  }

  // In the end, we stop the iterations when our left and right pointers point at
  // the same index (our wanted most minimum value), in the end we can also return nums[right]

  return nums[left];
}

//

function buildAdjacencyList() {
  let adjList = new Map();
  let edges = [
    ['A', 'B'],
    ['B', 'C'],
    ['B', 'E'],
    ['C', 'E'],
    ['E', 'D'],
  ];

  for (let edge of edges) {
    let src = edge[0];
    let dst = edge[1];

    if (!adjList.has(src)) {
      adjList.set(src, []);
    }

    if (!adjList.has(dst)) {
      adjList.set(dst, []);
    }

    adjList.get(src).push(dst);
  }

  return adjList;
}

//
// Designing adjacency list graph -> All methods

class AdjacencyListGraph {
  private adjList: Map<number, number[]>;

  constructor() {
    this.adjList = new Map<number, number[]>();
  }

  addEdge(src: number, dst: number): void {
    if (!this.adjList.has(src)) {
      this.adjList.set(src, []);
    }

    if (!this.adjList.has(dst)) {
      this.adjList.set(dst, []);
    }

    if (!this.adjList.get(src)!.includes(dst)) {
      this.adjList.get(src)!.push(dst);
    }
  }

  removeEdge(src: number, dst: number): boolean {
    if (!this.adjList.has(src)) {
      return false;
    }

    const neighbors = this.adjList.get(src)!;
    const index = neighbors.indexOf(dst);

    if (index === -1) {
      return false;
    }

    neighbors.splice(index, 1);
    return true;
  }

  hasPath(src: number, dst: number): boolean {
    let visit = new Set<number>();
    return this.dfs(src, dst, visit);
  }

  dfs(src: number, dst: number, visit: Set<number>): boolean {
    if (src === dst) {
      return true;
    }

    visit.add(src);

    for (let neighbor of this.adjList.get(src)!) {
      if (!visit.has(neighbor)) {
        if (this.dfs(neighbor, dst, visit)) {
          return true;
        }
      }
    }

    return false;
  }
}

//

const isValidPalindrome = (s: string): boolean => {
  const cleanInput = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let left = 0;
  let right = cleanInput.length - 1;

  while (left < right) {
    if (cleanInput[left] !== cleanInput[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

//

class EncodingDecoding {
  encode(strs: string[]) {
    if (strs.length === 0) return '';
    let sizes: number[] = [];
    let result = '';

    // After execution we'll get: [5, 5, 1] etc...
    for (let s of strs) {
      sizes.push(s.length);
    }

    // result = "5,5,1,"
    for (let sz of sizes) {
      result += sz + ',';
    }

    // After this we add a #, marking the end
    result += '#';

    // "5,5,1,#helloworld".
    for (let s of strs) {
      result += s;
    }

    return result;
  }

  decode(str: string) {
    if (str.length === 0) return [];

    let sizes: number[] = [];
    let res: string[] = [];
    let i = 0;

    // 1. Extract the sizes before the # delimiter
    while (str[i] !== '#') {
      let cur = '';

      // Read characters until hitting a comma
      while (str[i] !== ',') {
        cur += str[i];
        i++;
      }

      // Convert the string to a number and store it
      sizes.push(parseInt(cur));
      i++; // Skip over the comma
    }

    // Skip over the # delimiter
    i++;

    // 2. Extract the original strings using the sizes
    for (let sz of sizes) {
      res.push(str.substring(i, sz));
      i += sz;
    }

    return res;
  }
}

//
// Example: [1,2,4,6]
// output[0] = 2 x 4 x 6 = 48
// output[2] = 1 x 4 x 6 = 24
// so on...

// An implementation with using devision and not handling
// Zero number as an edge case

function productExceptSelf(nums: number[]) {
  let n = nums.length;
  let output = new Array(n);

  let totalProduct = 1;

  for (let num of nums) {
    totalProduct *= num;
  }

  for (let i = 0; i < n; i++) {
    output[i] = totalProduct / nums[i];
  }

  return output;
}

//
// Initial array: [1, 2, 4, 6]
function productExceptSelfSuffixs(nums: number[]) {
  let n = nums.length;
  let output = new Array(n);

  // Left-to-right
  // i=0: output[0] = 1, then leftProduct = 1×1 = 1
  // i=1: output[1] = 1, then leftProduct = 1×2 = 2
  // i=2: output[2] = 2, then leftProduct = 2×4 = 8
  // i=3: output[3] = 8, then leftProduct = 8×6 = 48

  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    output[i] = leftProduct;
    leftProduct *= nums[i];
  }

  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    output[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return output;
}

//

function cocoEatingBananas(piles: number[], h: number) {
  let L = 1;
  let R = Math.max(...piles);
  let res = R;

  while (L <= R) {
    const k = Math.floor((L + R) / 2);
    let totalTime = 0;

    for (const p of piles) {
      totalTime += Math.ceil(p / k);
    }

    if (totalTime <= h) {
      res = k;
      R = k - 1;
    } else {
      L = k + 1;
    }
  }

  return res;
}

//
// Search in Rotated Sorted Array

function searchRotatedArray(nums: number[], target: number) {
  let L = 1;
  let R = nums.length - 1;

  while (L <= R) {
    const mid = Math.floor((L + R) / 2);

    if (mid === target) {
      return mid;
    }

    // Left sorted portion
    if (nums[L] <= nums[mid]) {
      if (target > nums[mid] || target < nums[L]) {
        L = mid + 1;
      }
    } else {
      if (target < nums[mid] || target > nums[R]) {
        R = mid - 1;
      } else {
        L = mid + 1;
      }
    }
  }

  return -1;
}

//
// Invert a Binary Tree

function invertTree(root: TreeNode | null) {
  if (root === null) {
    return null;
  }

  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.right);
  invertTree(root.left);

  return root;
}

//
// Maximum Depth of a Binary Tree

function maxDepth(root: TreeNode | null) {
  if (root == null) {
    return 0;
  }

  let leftDepth = maxDepth(root.left);
  let rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

// Two sum 2 - array is sorted
//

function twoSum2(numbers: number[], target: number) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    let sum = numbers[left] + numbers[right];

    if (sum > target) {
      right--;
    } else if (sum < target) {
      left++;
    } else {
      return [left + 1, right + 1];
    }
  }
}

//
// 3Sum

function threeSum(nums: number[]) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum > 0) {
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        res.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
        while (left < right && nums[left] === nums[left - 1]) {
          left++;
        }
      }
    }
    return res;
  }
}

//
// Reorder Linked List

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

  // Reversing second half
  let prev: ListNode | null = null;
  let current = secondHalf;
  let next: ListNode | null = null;

  // [4, 5, 6]
  // [4, 5, 6]
  while (current) {
    next = current.next;
    current.next = prev; // reversing
    prev = current;
    current = next;
  }

  secondHalf = prev;

  // Pointer 1 and two
  let p1: ListNode | null = firstHalf;
  let p2: ListNode | null = secondHalf;
  let temp1: ListNode | null;
  let temp2: ListNode | null;

  while (p1 && p2) {
    temp1 = p1.next;
    temp2 = p2.next;

    // Connect p1 to p2
    p1.next = p2;

    if (temp1) {
      p2.next = temp1;
    }

    p1 = temp1;
    p2 = temp2;
  }
}

//
// Binary Tree Diameter

class DiameterTree {
  diameterOfBinaryTree(root: TreeNode | null) {
    let res = [0];
    this.dfs(root, res);
    // Why use res[0] instead of a simple variable?
    // - Because of how javascript handles primitive values, if we'll use a simple variable
    // - Passing that state into the recursive funciton would lead for it to be sent as a value
    // - but passing it as an array (object) would pass it as a reference, maintaining a persistant state of res
    return res[0];
  }

  dfs(root: TreeNode | null, res: number[]) {
    if (root === null) {
      return 0;
    }

    let left = this.dfs(root.left, res);
    let right = this.dfs(root.right, res);

    res[0] = Math.max(res[0], left + right);
    return 1 + Math.max(left, right);
  }
}

//
// isTreeBalanced

class IsTreeBalanced {
  isBalanced(root: TreeNode) {
    return this.checkHeight(root) != -1;
  }

  checkHeight(root: TreeNode | null) {
    if (root === null) {
      return 0;
    }

    let leftHeight = this.checkHeight(root.left);
    if (leftHeight == -1) {
      return -1;
    }

    let rightHeight = this.checkHeight(root.right);
    if (rightHeight == -1) {
      return -1;
    }

    // Math.abs() is used to get the absolute value of a number - which is the positive
    // magnitude of a number regardless of its sign. It essentially removes the negative
    // sign if the number is negative, and leaves positive numbers unchanged.

    // If leftHeight = 5 and rightHeight = 3,
    // then leftHeight - rightHeight = 2, and Math.abs(2) is 2

    // --

    // If leftHeight = 3 and rightHeight = 5,
    // then leftHeight - rightHeight = -2, and Math.abs(-2) is 2

    let heightDiff = Math.abs(leftHeight - rightHeight);

    if (heightDiff > 1) {
      return -1;
    }

    return 1 + Math.max(leftHeight, rightHeight);
  }
}

//

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

//

function isValidSudoki(board: string[][]) {
  const cols = new Map();
  const rows = new Map();
  const squares = new Map();

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === '.') continue;
      // Every cell within the same 3×3 square will generate the same squareKey
      // We also use it to check if that specific number is somewhere around in the
      // same square, if it is - we return false. It basically acts like a key for
      // encoding and decoding (in some sense)
      const squareKey = `${Math.floor(r / 3)},${Math.floor(c / 3)}`;

      if (
        (rows.get(r) && rows.get(r).has(board[r][c])) ||
        (cols.get(c) && cols.get(c).has(board[r][c])) ||
        (squares.get(squareKey) && squares.get(squareKey).has(board[r][c]))
      ) {
        return false;
      }

      // If that row/col/square hasn't been yet initialized, we initialize
      // An empty set inside it as a value of the hashMap
      if (!rows.has(r)) rows.set(r, new Set());
      if (!cols.has(c)) cols.set(c, new Set());
      if (!squares.has(squareKey)) squares.set(squareKey, new Set());

      rows.get(r).add(board[r][c]);
      cols.get(c).add(board[r][c]);
      squares.get(squareKey).add(board[r][c]);
    }
  }
  return true;
}

//

// Best time to buy and sell stock
function maxProfit(prices: number[]) {
  let l = 0;
  let r = 1;
  let maxP = 0;

  while (l < prices.length) {
    if (prices[l] < prices[r]) {
      let profit = prices[l] - prices[r];
      maxP = Math.max(maxP, profit);
    } else {
      l = r;
    }
    r++;
  }
  return maxP;
}

//

function isSameTree(q: TreeNode | null, p: TreeNode | null) {
  if (!q && !p) {
    return true;
  }

  // Recursively call both left and right children of the subtrees.
  // Backtracking will be handled by the base case, null && null = true
  if (p && q && p.val === q.val) {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  } else {
    return false;
  }
}

//

function getConcatenation(nums: number[]) {
  let n = nums.length;
  let ans = new Array(n * 2);

  for (let i = 0; i < n; i++) {
    ans[i] = nums[i];
    ans[i + n] = nums[i];
  }

  return ans;
}

//

function hasDuplicate(nums: number[]) {
  if (!nums) {
    return false;
  }

  const nums2 = new Set();

  for (let num of nums) {
    if (nums2.has(num)) {
      return true;
    } else {
      nums2.add(num);
    }
  }
  return false;
}

//

function isAnagram2(s: string, t: string) {
  if (s.length !== t.length) {
    return false;
  }

  let sortedS = s.split('').sort().join('');
  let sortedT = t.split('').sort().join('');

  if (sortedS === sortedT) {
    return true;
  }

  return false;
}

//

function longestCommonPrefix(strs: string[]) {
  for (let i = 0; i < strs[0].length; i++) {
    for (let s of strs) {
      if (i === s.length || s[i] !== strs[0][i]) {
        return s.slice(0, i);
      }
    }
  }
  return strs[0];
}

//

function majorityElement(nums: number[]) {
  let counts = new Map();

  for (const num of nums) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  let maxCount = 0;
  let maxNumber = null;
  for (const [num, count] of counts) {
    if (count > maxCount) {
      maxCount = count;
      maxNumber = num;
    }
  }

  return maxNumber;
}

//
// Design a Hash Set

class MyListNode {
  key: number;
  next: MyListNode | null;

  constructor(key: number) {
    this.key = key;
    this.next = null;
  }
}

class MyHashSet {
  set: MyListNode[];

  constructor() {
    this.set = Array.from({ length: 10000 }, () => new MyListNode(0));
  }

  hash(key: number): number {
    return key % this.set.length;
  }

  add(key: number): void {
    let curr = this.set[this.hash(key)];
    while (curr.next) {
      if (curr.next.key === key) {
        return;
      }
      curr = curr.next;
    }
    curr.next = new MyListNode(key);
  }

  remove(key: number): void {
    let curr = this.set[this.hash(key)];
    while (curr.next) {
      if (curr.next.key === key) {
        curr.next = curr.next.next;
        return;
      }
      curr = curr.next;
    }
  }

  contains(key: number): boolean {
    let curr = this.set[this.hash(key)];
    while (curr.next) {
      if (curr.next.key === key) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }
}

//
// Design a Hash Map

class MyHashNode {
  key: number;
  value: number;
  next: MyHashNode | null;

  constructor(key: number, value: any) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class MyHashMap {
  map: (MyHashNode | null)[];

  constructor() {
    this.map = new Array(16).fill(null);
  }

  put(key: number, value: number): void {
    let index = this.hash(key);

    if (this.map[index] === null) {
      this.map[index] = new MyHashNode(key, value);
    } else {
      let current = this.map[index];
      while (current !== null) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (current.next === null) break;
        current = current.next;
      }
      current.next = new MyHashNode(key, value);
    }
  }

  get(key: number): number {
    let index = this.hash(key);
    let current = this.map[index];

    while (current !== null) {
      if (current.key === key) {
        return current.value;
      } else {
        current = current.next;
      }
    }
    return -1;
  }

  remove(key: number): void {
    let index = this.hash(key);
    let current = this.map[index];

    if (!current) {
      return;
    }

    if (current.key === key) {
      this.map[index] = current.next;
      return;
    }

    while (current.next !== null) {
      if (current.next.key === key) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  hash(key: number): number {
    return key % this.map.length;
  }
}

//
// LRU Cache

class LRUCache {
  capacity: number;
  lruCache: Map<number, number>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.lruCache = new Map();
  }

  get(key: number) {
    if (this.lruCache.has(key)) {
      const value = this.lruCache.get(key);
      this.lruCache.delete(key);

      if (value) {
        this.lruCache.set(key, value);
      }

      return value;
    }
    return -1;
  }

  put(key: number, value: number) {
    if (this.lruCache.has(key)) {
      this.lruCache.delete(key);
    }

    if (this.lruCache.size >= this.capacity) {
      const oldestKey = this.lruCache.keys().next().value;
      this.lruCache.delete(oldestKey);
    }

    this.lruCache.set(key, value);
  }
}

//

function quickSort(arr: number[], s: number, e: number) {
  // Base case: If subarray has 1 or 0 elements, it's already sorted
  // Every recursive approach has an edge case!!!!

  if (e - s + 1 <= 1) {
    return arr;
  }

  // Rightmost element as a pivot
  let pivot = arr[e];

  // 'left' pointer tracks the boundary between smaller and larger elements
  // Everything to the left of 'left' will be < pivot
  let left = s;

  for (let i = s; i < e; i++) {
    // If current element is smaller than pivot
    if (arr[i] < pivot) {
      // Swap current element to the "smaller elements" section
      let temporary = arr[left];
      arr[left] = arr[i];
      arr[i] = temporary;
      left++;
    }
    // If arr[i] >= pivot, we do nothing - it stays in the "larger elements" section
  }

  // After the loop, 'left' points to where the pivot should go
  // Swap pivot from end position to its correct sorted position
  arr[e] = arr[left]; // Move whatever was at 'left' to the end
  arr[left] = pivot; // Place pivot in its final position

  quickSort(arr, s, left - 1); // Quick sort left side
  quickSort(arr, left + 1, e); // Quick sort right side

  return arr;
}

//
// Sort an array

class SortArray {
  sortArray(nums: number[]) {
    let l = nums[0];
    let r = nums[nums.length - 1];

    if (l < r) {
      let m = Math.floor((l + r) / 2);
      this.sortArray(nums);
      this.sortArray(nums);
      this.mergeSort;
    }
  }

  mergeSort(nums: number[], l: number, r: number) {}
}

//
// Given a matrix, we first calculate all of the sums, going from left to right
// and then to below, going from left to right again, with i being the row num
// and j being the col

class NumMatrix {
  prefixSum: number[][];
  constructor(matrix: number[][]) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // empty 2D array filled with 0 values at first, below we gradually start
    // to fill it up, BUT with the new calculated sum values to the given prefix
    this.prefixSum = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.prefixSum[i][j] =
          matrix[i][j] +
          // add above
          (i > 0 ? this.prefixSum[i - 1][j] : 0) +
          // add left
          (j > 0 ? this.prefixSum[i][j - 1] : 0) -
          // remove the overlap in the top left, because we
          // Calculated it twice
          (i > 0 && j > 0 ? this.prefixSum[i - 1][j - 1] : 0);
      }
    }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    // Start with the biggest rectangle (bottom right corner)
    let result = this.prefixSum[row2][col2];

    // remove the above
    if (row1 > 0) {
      result -= this.prefixSum[row1 - 1][col2];
    }

    // remove the left
    if (col1 > 0) {
      result -= this.prefixSum[row2][col1 - 1];
    }

    // Add back the top left above corner
    if (row1 > 0 && col1 > 0) {
      result += this.prefixSum[row1 - 1][col1 - 1];
    }

    return result;
  }
}

//
// Similar from above, but with a slightly different implementation

class NumMatrix2 {
  sumMat: number[][];
  x;
  constructor(matrix: number[][]) {
    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    this.sumMat = Array.from({ length: ROWS + 1 }, () =>
      Array(COLS + 1).fill(0),
    );

    for (let r = 0; r < ROWS; r++) {
      let prefix = 0;
      for (let c = 0; c < COLS; c++) {
        prefix += matrix[r][c];
        const above = this.sumMat[r][c + 1];
        this.sumMat[r + 1][c + 1] = prefix + above;
      }
    }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number) {
    row1++;
    col1++;
    row2++;
    col2++;

    const bottomRight = this.sumMat[row2][col2];
    const above = this.sumMat[row1 - 1][col2];
    const left = this.sumMat[row2][col1 - 1];
    const topLeft = this.sumMat[row1 - 1][col1 - 1];
    return bottomRight - above - left + topLeft;
  }
}

//
// Longest consecutive sentence

function longestConsecutive(nums: number[]) {
  // Handle edge case: empty array
  if (nums.length === 0) return 0;

  let set = new Set<number>();
  let maxLength = 0;

  // First we add to a set for O(1) lookups
  for (let i = 0; i < nums.length; i++) {
    set.add(nums[i]);
  }

  // Second pass: Find starting points and count consecutive sequences
  for (let num of set) {
    // Check if this number is the start of a consecutive sequence
    // A number is a starting point if (num - 1) doesn't exist in the set
    if (!set.has(num - 1)) {
      let currentLength = 1;
      let currentNum = num;

      // Count consecutive numbers going forward from the starting point
      // Keep incrementing while the next consecutive number exists
      while (set.has(currentNum + 1)) {
        currentLength++;
        currentNum++;
      }

      // If current sequence is longer than the previous, update
      // the upper maxLength (the one which we'll return)
      maxLength = Math.max(maxLength, currentLength);
    }
  }
  return maxLength;
}

//
// Best time to buy and sell stock 2
function maxProfit2(prices: number[]) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
}

//

function reverseString(s: string[]) {
  let L = 0;
  let R = s.length - 1;

  while (L <= R) {
    let temp = s[L];
    s[L] = s[R];
    s[R] = temp;
    L++;
    R--;
  }
}

//

class isValidPalindrome2 {
  validPalindrome(s: string) {
    const cleanInput = s.replace(/[^a-zA-Z0-9]/g, '').toLocaleLowerCase();
    let L = 0;
    let R = cleanInput.length - 1;

    while (L <= R) {
      if (cleanInput[L] !== cleanInput[R]) {
        return (
          this.isPalindromRange(cleanInput, L + 1, R) ||
          this.isPalindromRange(cleanInput, L, R - 1)
        );
      }
      L++;
      R--;
    }
    return true;
  }

  isPalindromRange(str: string, left: number, right: number) {
    while (left <= right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }
}

//
// You are given two strings, word1 and word2. Construct a new string by
// merging them in alternating order, starting with word1 — take one
// character from word1, then one from word2, and repeat this process.

function mergeAlternately(word1: string, word2: string) {
  let n = word1.length;
  let m = word2.length;

  let finalString: string[] = [];

  let L = 0;
  let R = 0;

  while (L < n || R < m) {
    finalString.push(word1[L++]);
    finalString.push(word2[R++]);
  }

  return finalString.join('');
}

//
// Container With Most Water
// 1. Brute Force

function maxArea(height: number[]) {
  let res = 0;
  for (let l = 0; l < height.length; l++) {
    for (let r = l + 1; r < height.length; r++) {
      let area = (r - l) * Math.min(height[l], height[r]);
      res = Math.max(res, area);
    }
  }
  return res;
}

// 2. Linear time O(n)
function maxArea2(height: number[]) {
  let res = 0;
  let L = 0;
  let R = height.length - 1;

  while (L <= R) {
    let area = (R - L) * Math.min(height[L], height[R]);
    res = Math.max(res, area);

    if (height[L] < height[R]) {
      L++;
    } else {
      R--;
    }
  }

  return res;
}

//
// Merge sorted Arrays

function mergeArrays(nums1: number[], m: number, nums2: number[], n: number) {
  let last = m + n - 1;
  let i = m - 1;
  let j = n - 1;

  while (j >= 0) {
    if (i > 0 && nums1[i] > nums2[j]) {
      nums1[last] = nums1[i];
      i = i - 1;
      last = last - 1;
    } else {
      nums1[last] = nums2[j];
      j = j - 1;
      last = last - 1;
    }
  }
}

//
// Rotate array in-place

class RotateArray {
  rotate(nums: number[], k: number) {
    let n = k % nums.length;

    this.reverse(nums, 0, nums.length - 1); // Reverse entire array
    this.reverse(nums, 0, n - 1); // Reverse first k elements
    this.reverse(nums, n, nums.length - 1); // Reverse remaining elements
  }

  reverse(nums: number[], start: number, end: number) {
    while (start < end) {
      let temp = nums[start];
      nums[start] = nums[end];
      nums[end] = temp;
      start++;
      end--;
    }
  }
}

//
// Rotate array in-place (extra space)

function rotateArray2(nums: number[], k: number) {
  const n = nums.length;
  const temp = new Array(n);

  for (let i = 0; i < n; i++) {
    temp[(i + k) % n] = nums[i];
  }

  for (let i = 0; i < n; i++) {
    nums[i] = temp[i];
  }
}

//
// Contains Duplicate 2 - Hash Map

function containsNearbyDuplicate(nums: number[], k: number) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
      return true;
    }
    map.set(nums[i], i);
  }
  return false;
}

//
// Longest Substring Without Repeating Characters

function lengthOfLongestSubstringg(s: string) {
  if (!s) return;
  let set = new Set();
  let L = 0;
  let res = 0;

  for (let R = 0; R < s.length; R++) {
    while (set.has(s[R])) {
      set.delete(s[L]);
      L++;
    }
    set.add(s[R]);
    res = Math.max(res, R - L + 1);
  }

  return res;
}

//
// Longest Repeating Character Replacement
// input: "XYYX" k = 2
// explanation: Either replace the 'X's with 'Y's, or replace the 'Y's with 'X's.

function characterReplacement(s: string, k: number) {
  let count = new Map();
  let res = 0;
  let L = 0;

  for (let R = 0; R < s.length; R++) {
    count.set(s[R], (count.get(s[R]) || 0) + 1);

    while (R - L + 1 - Math.max(...count.values()) > k) {
      count.set(s[L], count.get(s[L]) - 1);
      L++;
    }

    res = Math.max(res, R - L + 1);
  }
  return res;
}

//
//
//
//
//
// Permutation in string

class PermutationInString {
  checkInclusion(s1: string, s2: string) {
    const n = s1.length;
    let L = 0;

    for (let R = n; R < s2.length; R++) {
      const substring = s2.substring(L, R);
      const sortedString = this.sort(substring);
      const sortedString1 = this.sort(s1);

      if (sortedString === sortedString1) {
        return true;
      }

      L++;
    }
    return false;
  }

  sort(str: string) {
    return str.split('').sort().join();
  }
}

//
// Approach 2

class PermutationInString2 {
  checkInclusion(s1: string, s2: string) {
    const n = s1.length;
    const sortedS1 = this.sort(s1);

    for (let i = 0; i <= s2.length - n; i++) {
      const substring = s2.substring(i, i + n);

      if (this.sort(substring) === sortedS1) {
        return true;
      }
    }
    return false;
  }

  sort(str: string) {
    return str.split('').sort().join();
  }
}

//
// Deep Copy Linked List with a Random Pointer

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

//
//

class SlidingWindowMaximum {
  maxSlidingWindow(nums: number[], k: number) {
    const n = nums.length;
    let res: number[] = [];

    for (let R = k - 1; R < n; R++) {
      let L = R - k + 1; // Where our sliding window starts (R - K + 1)
      let maxValue = this.findMax(nums, L, R);
      res.push(maxValue);
    }

    return res;
  }

  findMax(nums: number[], L: number, R: number) {
    let max = nums[L];

    for (let i = L + 1; i <= R; i++) {
      if (nums[i] > max) {
        max = nums[i];
      }
    }
    return max;
  }
}

function maxSlidingWindow(nums: number[], k: number) {
  const n = nums.length;
  let res: number[] = new Array(n - k + 1);
  let dequeue = new Deque<number>(); // stores indices!
  let L = 0; // Left boundary of window
  let R = 0; // Right boundary of window (current position)

  while (R < n) {
    // This maintains the monotonic decreasing property. If the current element is larger
    // than elements at the back of the deque, those smaller elements can never be the
    // maximum in any future window, so we remove them.

    while (!dequeue.isEmpty() && nums[dequeue.back()] < nums[R]) {
      dequeue.popBack();
    }
    dequeue.pushBack(R);

    // Remove elements outside current window
    if (dequeue.front() < L) {
      dequeue.popFront();
    }

    // Add to result when window is complete
    if (R + 1 >= k) {
      res.push(nums[dequeue.front()]);
      L++;
    }
    R++;
  }

  return res;
}

//
// Minimum Size Subarray Sum

function minSubArrayLength(nums: number[], target: number) {
  let n = nums.length;
  let sum = 0;
  let res = Number.MAX_SAFE_INTEGER;
  let L = 0;

  for (let R = 0; R < n; R++) {
    sum += nums[R];

    while (sum >= target) {
      res = Math.min(res, R - L + 1);
      sum -= nums[L];
      L++;
    }
  }
  return res === Number.MAX_SAFE_INTEGER ? 0 : res;
}

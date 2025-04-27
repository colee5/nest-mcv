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

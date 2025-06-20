// Arrays & Strings Problems

// Two Pointers
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

const concatElement = (nums: number[]) => {
  let n = nums.length;
  let ans = new Array(n * 2);

  for (let i = 0; i < n; i++) {
    ans[i] = nums[i];
    ans[i + n] = nums[i];
  }

  return ans;
};

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

function getConcatenation(nums: number[]) {
  let n = nums.length;
  let ans = new Array(n * 2);

  for (let i = 0; i < n; i++) {
    ans[i] = nums[i];
    ans[i + n] = nums[i];
  }

  return ans;
}

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

class RotateArray {
  rotate(nums: number[], k: number) {
    let n = k % nums.length;

    this.reverse(nums, 0, nums.length - 1);
    this.reverse(nums, 0, n - 1);
    this.reverse(nums, n, nums.length - 1);
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

function containerWithMostWater(height: number[]) {
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

function longestConsecutive(nums: number[]) {
  if (nums.length === 0) return 0;

  let set = new Set<number>();
  let maxLength = 0;

  for (let i = 0; i < nums.length; i++) {
    set.add(nums[i]);
  }

  for (let num of set) {
    if (!set.has(num - 1)) {
      let currentLength = 1;
      let currentNum = num;

      while (set.has(currentNum + 1)) {
        currentLength++;
        currentNum++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }
  }
  return maxLength;
}

function productExceptSelf(nums: number[]) {
  let n = nums.length;
  let output = new Array(n);

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

class EncodingDecoding {
  encode(strs: string[]) {
    if (strs.length === 0) return '';
    let sizes: number[] = [];
    let result = '';

    for (let s of strs) {
      sizes.push(s.length);
    }

    for (let sz of sizes) {
      result += sz + ',';
    }

    result += '#';

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

    while (str[i] !== '#') {
      let cur = '';

      while (str[i] !== ',') {
        cur += str[i];
        i++;
      }

      sizes.push(parseInt(cur));
      i++;
    }

    i++;

    for (let sz of sizes) {
      res.push(str.substring(i, sz));
      i += sz;
    }

    return res;
  }
}

function isValidSudoki(board: string[][]) {
  const cols = new Map();
  const rows = new Map();
  const squares = new Map();

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === '.') continue;
      const squareKey = `${Math.floor(r / 3)},${Math.floor(c / 3)}`;

      if (
        (rows.get(r) && rows.get(r).has(board[r][c])) ||
        (cols.get(c) && cols.get(c).has(board[r][c])) ||
        (squares.get(squareKey) && squares.get(squareKey).has(board[r][c]))
      ) {
        return false;
      }

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

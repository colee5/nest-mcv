import { Deque } from '@datastructures-js/deque';

// Sliding Window Problems

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

class SlidingWindowMaximum {
  maxSlidingWindow(nums: number[], k: number) {
    const n = nums.length;
    let res: number[] = [];

    for (let R = k - 1; R < n; R++) {
      let L = R - k + 1;
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
  let dequeue = new Deque<number>();
  let L = 0;
  let R = 0;

  while (R < n) {
    while (!dequeue.isEmpty() && nums[dequeue.back()] < nums[R]) {
      dequeue.popBack();
    }
    dequeue.pushBack(R);

    if (dequeue.front() < L) {
      dequeue.popFront();
    }

    if (R + 1 >= k) {
      res.push(nums[dequeue.front()]);
      L++;
    }
    R++;
  }

  return res;
}

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

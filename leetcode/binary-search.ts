// Binary Search Problems

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

function isBadVersion(num: number): number {
  return -1;
}

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

function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
}

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

function searchRotatedArray(nums: number[], target: number) {
  let L = 1;
  let R = nums.length - 1;

  while (L <= R) {
    const mid = Math.floor((L + R) / 2);

    if (mid === target) {
      return mid;
    }

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

function findClosestElements(arr: number[], k: number, x: number) {
  arr.sort((a, b) => {
    const diff = Math.abs(a - x) - Math.abs(b - x);
    return diff === 0 ? a - b : diff;
  });

  const result = arr.slice(0, k);
  return result.sort((a, b) => a - b);
}

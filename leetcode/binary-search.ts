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

function cocoEatingBananasBrute(piles: number[], h: number) {
  let speed = 1;

  while (true) {
    let totalTime = 0;

    for (let p of piles) {
      totalTime += Math.ceil(p / speed);
    }

    if (totalTime <= h) {
      return speed;
    }

    speed++;
  }
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
  let L = 0;
  let R = nums.length - 1;

  while (L <= R) {
    const mid = Math.floor((L + R) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[L] <= nums[mid]) {
      if (target >= nums[L] && target < nums[mid]) {
        R = mid - 1; // Target is in left half
      } else {
        L = mid + 1; // Target is in right half
      }
    } else {
      if (target > nums[mid] && target <= nums[R]) {
        L = mid + 1; // Target is in right half
      } else {
        R = mid - 1; // Target is in left half
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

function searchInsert(nums: number[], target: number) {
  let L = 0;
  let R = nums.length - 1;

  while (L <= R) {
    let mid = Math.floor((L + R) / 2);

    if (target > nums[mid]) {
      L = mid + 1;
    } else if (target < nums[mid]) {
      R = mid - 1;
    } else {
      return mid;
    }
  }
  return L;
}

function squareRoot(x: number) {
  let L = 0;
  let R = x;
  let result = 0;

  while (L <= R) {
    let mid = Math.floor((L + R) / 2);

    if (mid * mid <= x) {
      L = mid + 1;
      result = mid;
    } else if (mid * mid > x) {
      R = mid - 1;
    }
  }
  return result;
}

// weights = [1, 2, 3, 4, 5]
// days = 5
class CapacityToShipWithinDays {
  shipWithinDays(weights: number[], days: number) {
    let L = Math.max(...weights);
    let R = 0;
    let res = 0;

    for (let i = 0; i < weights.length; i++) {
      R += weights[i];
    }

    while (L <= R) {
      let mid = Math.floor((L + R) / 2);

      if (this.canShipInDays(weights, mid, days)) {
        res = mid;
        R = mid - 1;
      } else {
        L = mid + 1;
      }
    }
    return res;
  }

  canShipInDays(weights: number[], capacity: number, days: number) {
    let daysUsed = 1;
    let currentDayWeight = 0;

    for (let weight of weights) {
      // Try to add this package to current day
      if (currentDayWeight + weight <= capacity) {
        // Package fits on current day
        currentDayWeight += weight;
      } else {
        // Package doesn't fit, start new day
        daysUsed++;
        currentDayWeight = weight;
      }
    }
    return daysUsed <= days;
  }
}

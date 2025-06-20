// Sorting Problems

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

  return arr;
}

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

function reverse(arr: number[], start: number, end: number): void {
  while (start < end) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}

function quickSort(arr: number[], s: number, e: number) {
  if (e - s + 1 <= 1) {
    return arr;
  }

  let pivot = arr[e];
  let left = s;

  for (let i = s; i < e; i++) {
    if (arr[i] < pivot) {
      let temporary = arr[left];
      arr[left] = arr[i];
      arr[i] = temporary;
      left++;
    }
  }

  arr[e] = arr[left];
  arr[left] = pivot;

  quickSort(arr, s, left - 1);
  quickSort(arr, left + 1, e);

  return arr;
}

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

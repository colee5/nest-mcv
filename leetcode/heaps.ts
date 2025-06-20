// Heap Problems

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

function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map();

  for (const num of nums) {
    if (!map.has(num)) {
      map.set(num, 0);
    }

    const val = map.get(num) || 0;
    map.set(num, val + 1);
  }

  const entries = Array.from(map.entries());
  entries.sort((a, b) => b[1] - a[1]);
  const result = entries.slice(0, k).map((entry) => entry[0]);
  return result;
}

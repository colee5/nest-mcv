// Hash Map & Hash Set Problems

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

function groupAnagrams(strs: string[]): string[][] {
  const map = new Map();

  for (const str of strs) {
    const sortedStr = str.split('').sort().join();

    if (!map.has(sortedStr)) {
      map.set(sortedStr, []);
    }

    map.get(sortedStr).push(str);
  }

  return Array.from(map.values());
}

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

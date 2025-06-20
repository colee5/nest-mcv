// Binary Tree Problems

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

function minValueNode(root: TreeNode) {
  let curr = root;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

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

function inorder(root: TreeNode | null) {
  if (root == null) {
    return;
  }

  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}

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

function bfs(root: TreeNode | null): void {
  let queue: TreeNode[] = [];

  if (root !== null) {
    queue.push(root);
  }

  let level = 0;

  while (queue.length > 0) {
    console.log('level' + level + ': ');

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
      if (key < curr.key) {
        if (!curr.left) {
          curr.left = newNode;
          return;
        }
        curr = curr.left;
      } else if (key > curr.key) {
        if (!curr.right) {
          curr.right = newNode;
          return;
        }
        curr = curr.right;
      } else {
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

  private removeHelper(curr: TreeMap | null, key: number): TreeMap | null {
    if (curr == null) {
      return null;
    }

    if (key > curr.key) {
      curr.right = this.removeHelper(curr.right, key);
    } else if (key < curr.key) {
      curr.left = this.removeHelper(curr.left, key);
    } else {
      if (curr.left == null) {
        return curr.right;
      } else if (curr.right == null) {
        return curr.left;
      } else {
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

function maxDepth(root: TreeNode | null) {
  if (root == null) {
    return 0;
  }

  let leftDepth = maxDepth(root.left);
  let rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

class DiameterTree {
  diameterOfBinaryTree(root: TreeNode | null) {
    let res = [0];
    this.dfs(root, res);
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

    let heightDiff = Math.abs(leftHeight - rightHeight);

    if (heightDiff > 1) {
      return -1;
    }

    return 1 + Math.max(leftHeight, rightHeight);
  }
}

function isSameTree(q: TreeNode | null, p: TreeNode | null) {
  if (!q && !p) {
    return true;
  }

  if (p && q && p.val === q.val) {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  } else {
    return false;
  }
}

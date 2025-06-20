// Backtracking & DFS Problems

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
  count += dfs(grid, r + 1, c, visit);
  count += dfs(grid, r - 1, c, visit);
  count += dfs(grid, r, c + 1, visit);
  count += dfs(grid, r, c - 1, visit);

  visit[r][c] = 0;
  return count;
}

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

    count += helper(r + 1, c, new Set());
    count += helper(r - 1, c, new Set());
    count += helper(r, c + 1, new Set());
    count += helper(r, c - 1, new Set());

    visit.delete(`${r}-${c}`);
    return count;
  }

  return helper(0, 0, new Set());
}

// Dynamic Programming Problems

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

function maxProfit(prices: number[]) {
  let l = 0;
  let r = 1;
  let maxP = 0;

  while (l < prices.length) {
    if (prices[l] < prices[r]) {
      let profit = prices[l] - prices[r];
      maxP = Math.max(maxP, profit);
    } else {
      l = r;
    }
    r++;
  }
  return maxP;
}

function maxProfit2(prices: number[]) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
}

class NumMatrix {
  prefixSum: number[][];
  constructor(matrix: number[][]) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    this.prefixSum = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.prefixSum[i][j] =
          matrix[i][j] +
          (i > 0 ? this.prefixSum[i - 1][j] : 0) +
          (j > 0 ? this.prefixSum[i][j - 1] : 0) -
          (i > 0 && j > 0 ? this.prefixSum[i - 1][j - 1] : 0);
      }
    }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    let result = this.prefixSum[row2][col2];

    if (row1 > 0) {
      result -= this.prefixSum[row1 - 1][col2];
    }

    if (col1 > 0) {
      result -= this.prefixSum[row2][col1 - 1];
    }

    if (row1 > 0 && col1 > 0) {
      result += this.prefixSum[row1 - 1][col1 - 1];
    }

    return result;
  }
}

class NumMatrix2 {
  sumMat: number[][];
  x;
  constructor(matrix: number[][]) {
    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    this.sumMat = Array.from({ length: ROWS + 1 }, () =>
      Array(COLS + 1).fill(0),
    );

    for (let r = 0; r < ROWS; r++) {
      let prefix = 0;
      for (let c = 0; c < COLS; c++) {
        prefix += matrix[r][c];
        const above = this.sumMat[r][c + 1];
        this.sumMat[r + 1][c + 1] = prefix + above;
      }
    }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number) {
    row1++;
    col1++;
    row2++;
    col2++;

    const bottomRight = this.sumMat[row2][col2];
    const above = this.sumMat[row1 - 1][col2];
    const left = this.sumMat[row2][col1 - 1];
    const topLeft = this.sumMat[row1 - 1][col1 - 1];
    return bottomRight - above - left + topLeft;
  }
}

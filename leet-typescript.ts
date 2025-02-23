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

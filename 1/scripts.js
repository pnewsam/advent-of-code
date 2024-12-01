const fs = require("node:fs/promises");
const path = require("node:path");

async function processFile() {
  const filePath = path.join(__dirname, "input.txt");
  try {
    const data = await fs.readFile(filePath, { encoding: "utf-8" });
    return data;
  } catch (err) {
    console.log(err);
    return "";
  }
}

function bisectData(data) {
  const [left, right] = [[], []];
  const lines = data.split("\n");
  for (const line of lines) {
    const [l, r] = line.split("   ");
    if (left) left.push(l);
    if (right) right.push(r);
  }
  return [left, right];
}

function sumDistances(left, right) {
  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    const diff = Math.abs(right[i] - left[i]);
    sum += diff;
  }
  return sum;
}

function mapFrequencies(nums) {
  const map = new Map();
  for (num of nums) {
    if (map.has(num)) {
      const val = map.get(num);
      map.set(num, val + 1);
    } else {
      map.set(num, 1);
    }
  }

  return map;
}

function calcSimilarityScore(nums, frequency) {
  let score = 0;
  for (num of nums) {
    if (frequency.has(num)) {
      const freq = frequency.get(num);
      score += num * freq;
    }
  }
  return score;
}

(async () => {
  const data = await processFile();

  if (data) {
    const [left, right] = bisectData(data);
    left.sort();
    right.sort();

    // Task 1
    const sum = sumDistances(left, right);
    console.log(`SUM IS: ${sum}`);

    // Task 2
    const frequency = mapFrequencies(right);
    const score = calcSimilarityScore(left, frequency);
    console.log(`SCORE IS: ${score}`);
  }
})();

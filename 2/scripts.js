const fs = require("node:fs/promises");
const path = require("node:path");

async function processFile() {
  const filePath = path.join(__dirname, "input.txt");
  try {
    const data = await fs.readFile(filePath, { encoding: "utf-8" });
    return data;
  } catch (err) {
    return "";
  }
}

function checkSafe(nums) {
  let increasing;

  for (let i = 0; i < nums.length - 1; i++) {
    const current = parseInt(nums[i], 10);
    const next = parseInt(nums[i + 1], 10);

    if (typeof increasing === "undefined") {
      if (next === current) return false;
      if (next > current) increasing = true;
      if (next < current) increasing = false;
    } else {
      if (increasing && next <= current) return false;
      if (!increasing && next >= current) return false;
    }

    const diff = increasing ? next - current : current - next;

    if (diff < 1 || diff > 3) return false;
  }

  return true;
}

(async () => {
  const data = await processFile();

  let safeCount = 0;

  const lines = data.split("\n");
  for (line of lines) {
    const nums = line.split(" ");
    if (checkSafe(nums)) safeCount += 1;
  }

  console.log("SAFE COUNT: ", safeCount);
})();

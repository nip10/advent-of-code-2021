const fs = require("fs");
// Read input file into array
const lines = fs.readFileSync("day1-input.txt", "utf8").toString().split("\n");

let counter = 0;
let previousSum = 0;
for (let i = 0; i < lines.length - 2; i++) {
  const currentSum =
    Number.parseInt(lines[i]) +
    Number.parseInt(lines[i + 1]) +
    Number.parseInt(lines[i + 2]);
  // dont count the first iteration, since the previous count doesnt actually exist
  if (i !== 0 && currentSum > previousSum) {
    counter++;
  }
  previousSum = currentSum;
}
console.log(`Counter: ${counter}`);

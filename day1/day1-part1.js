const fs = require("fs");
// Read input file into array
const lines = fs.readFileSync("day1-input.txt", "utf8").toString().split("\n");

// Option 1
// let counter = 0;
// for (let i = 1; i < lines.length; i++) {
//   if (Number.parseInt(lines[i - 1], 10) < Number.parseInt(lines[i], 10)) {
//     counter++;
//   }
// }

// Option 2
const counter = lines.reduce(
  (acc, curr, i) =>
    Number.parseInt(lines[i - 1], 10) < Number.parseInt(curr, 10)
      ? acc + 1
      : acc,
  0
);

console.log(`Counter: ${counter}`);

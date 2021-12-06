const fs = require("fs");
// Read input file into array
const lines = fs.readFileSync("day2-input.txt", "utf8").toString().split("\n");

let horizontalPosition = 0;
let depth = 0;
let aim = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [direction, units] = line.split(" ");
  if (direction === "forward") {
    horizontalPosition += Number.parseInt(units, 10);
    depth += Number.parseInt(units, 10) * aim;
  } else if (direction === "down") {
    aim += Number.parseInt(units, 10);
  } else if (direction === "up") {
    aim -= Number.parseInt(units, 10);
  }
}
console.log(
  `Final position: Horizontal - ${horizontalPosition}; Depth - ${depth}; Mult: ${
    horizontalPosition * depth
  }`
);

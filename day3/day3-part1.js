const fs = require("fs");
// Read input file into array
const lines = fs.readFileSync("day3-input.txt", "utf8").toString().split("\n");

const bitMapsPerColumn = new Array(lines[0].length).fill(null).map(() => {
  const bitMap = new Map();
  bitMap.set("0", 0);
  bitMap.set("1", 0);
  return bitMap;
});

// O(n**2)
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const column = line[j];
    bitMapsPerColumn[j].set(column, bitMapsPerColumn[j].get(column) + 1);
  }
}

let mostCommonBits = "";
let leastCommonBits = "";
for (let k = 0; k < bitMapsPerColumn.length; k++) {
  const bitMap = bitMapsPerColumn[k];
  mostCommonBits = mostCommonBits.concat(
    bitMap.get("1") > bitMap.get("0") ? "1" : "0"
  );
  leastCommonBits = leastCommonBits.concat(
    bitMap.get("1") < bitMap.get("0") ? "1" : "0"
  );
}

function binaryToDecimal(binary) {
  return Number.parseInt(binary, 2);
}

console.log(
  `Gamma rate ${binaryToDecimal(
    mostCommonBits
  )}; Epsilon rate ${binaryToDecimal(leastCommonBits)}; Power Consumption ${
    binaryToDecimal(mostCommonBits) * binaryToDecimal(leastCommonBits)
  }`
);

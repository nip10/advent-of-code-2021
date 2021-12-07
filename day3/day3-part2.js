const fs = require("fs");
// Read input file into array
const lines = fs.readFileSync("day3-input.txt", "utf8").toString().split("\n");

function findValue(valueType, data, columnIndex = 0) {
  const bitMap = new Map();
  bitMap.set("0", 0);
  bitMap.set("1", 0);
  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    // console.log("line", line);
    const column = line[columnIndex];
    bitMap.set(column, bitMap.get(column) + 1);
  }
  // console.log("bitmap", bitMap);
  // If we get to the last column, and the bitMap count is the same for both "0" and "1", we need to
  // choose according to the variable we are trying to find. If we want the "oxygen generator
  // rating", we must choose the number with the "1" bit. If we want the "CO2 scrubber rating", we
  // must choose the number with the "0" bit.
  if (
    columnIndex === data[0].length - 1 &&
    bitMap.get("0") === bitMap.get("1")
  ) {
    if (columnIndex === data[0].length - 1) {
      if (valueType === "oxygen") {
        return data.find((line) => line[columnIndex] === "1");
      } else if (valueType === "co2") {
        return data.find((line) => line[columnIndex] === "0");
      }
    }
  }
  const filteredLines = data.filter((line) => {
    // console.log("line[columnIndex]", line[columnIndex]);
    if (valueType === "oxygen") {
      return (
        line[columnIndex] === (bitMap.get("1") >= bitMap.get("0") ? "1" : "0")
      );
    } else if (valueType === "co2") {
      return (
        line[columnIndex] === (bitMap.get("1") >= bitMap.get("0") ? "0" : "1")
      );
    }
  });
  // console.log("filteredLines", filteredLines);
  if (filteredLines.length === 1) {
    return filteredLines[0];
  } else {
    return findValue(valueType, filteredLines, columnIndex + 1);
  }
}

const oxygen = findValue("oxygen", lines);
console.log("oxygen", oxygen);
const co2 = findValue("co2", lines);
console.log("co2", co2);

const lifeSupportRating = Number.parseInt(oxygen, 2) * Number.parseInt(co2, 2);
console.log("lifeSupportRating", lifeSupportRating);

// oxygen 101011000000
// co2 001110010111
// lifeSupportRating 2529088
// TOO LOW

const fs = require("fs");
// Read input file into array
const inputLines = fs
  .readFileSync("day5-input.txt", "utf8")
  .toString()
  .split("\n");

// For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.
function calculatePointsInLine(startX, endX, startY, endY) {
  let x = startX;
  let y = startY;
  const xDiff = endX - startX;
  // console.log("xDiff", xDiff);
  const xInc = xDiff === 0 ? 0 : xDiff > 0 ? 1 : -1;
  // console.log("xInc", xInc);
  const yDiff = endY - startY;
  // console.log("yDiff", yDiff);
  const yInc = yDiff === 0 ? 0 : yDiff > 0 ? 1 : -1;
  // console.log("yInc", yInc);
  const points = [];
  while (x !== endX || y !== endY) {
    // console.log("x", x, "y", y);
    points.push([x, y]);
    x += xInc;
    y += yInc;
  }
  // add the end point, since it wont be added in the loop above
  points.push([x, y]);
  return points;
}

const parseNumberFn = (val) => Number.parseInt(val, 10);

const ventCoordMap = new Map();
for (let i = 0; i < inputLines.length; i++) {
  const inputLine = inputLines[i];
  // console.log("inputLine", inputLine);
  const [startCoords, endCoords] = inputLine.split(" -> ");
  // console.log("startCoords", startCoords);
  // console.log("endCoords", endCoords);
  const [startX, startY] = startCoords.split(",").map(parseNumberFn);
  // console.log("startX", startX);
  // console.log("startY", startY);
  const [endX, endY] = endCoords.split(",").map(parseNumberFn);
  // console.log("endX", endX);
  // console.log("endY", endY);
  const points = calculatePointsInLine(startX, endX, startY, endY);
  // console.log("points", points);
  for (let j = 0; j < points.length; j++) {
    const [x, y] = points[j];
    const stringified = JSON.stringify({ x, y });
    if (ventCoordMap.has(stringified)) {
      ventCoordMap.set(stringified, ventCoordMap.get(stringified) + 1);
    } else {
      ventCoordMap.set(stringified, 1);
    }
  }
  // console.log("ventCoordMap", ventCoordMap);
}

// print all coords with > 1 occurences
const coordsWithMultipleVents = [];
for (let [key, value] of ventCoordMap) {
  if (value > 1) {
    coordsWithMultipleVents.push(JSON.parse(key));
  }
}
console.log("coordsWithMultipleVents", coordsWithMultipleVents);
console.log(
  "number of coords with multiple vents",
  coordsWithMultipleVents.length
);

const fs = require("fs");
const util = require("util");
// Read input file into array
const initialState = fs
  .readFileSync("day6-input.txt", "utf8")
  .toString()
  .split(",")
  .map(Number);
const stateMap = new Map();
for (let i = 0; i < 9; i++) {
  stateMap.set(
    i,
    initialState.reduce((acc, curr) => (curr === i ? acc + 1 : acc), 0)
  );
}

function tick(fishStateMap) {
  const numInStateZero = fishStateMap.get(0);
  for (let i = 0; i < 8; i++) {
    fishStateMap.set(i, fishStateMap.get(i + 1));
  }
  fishStateMap.set(6, numInStateZero + fishStateMap.get(6));
  fishStateMap.set(8, numInStateZero);
}

const DAYS_TO_RUN = 256;
function run() {
  console.log("initial state map", stateMap);
  for (let i = 0; i < DAYS_TO_RUN; i++) {
    tick(stateMap);
    // console.log(
    //   `After ${i + 1} days: ${util.inspect(stateMap, false, null, true)}`
    // );
  }
  let numFish = 0;
  for (const [, value] of stateMap) {
    numFish += value;
  }
  console.log(`After ${DAYS_TO_RUN} days, there are ${numFish} fish.`);
}

run();

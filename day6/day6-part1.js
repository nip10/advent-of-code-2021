const fs = require("fs");
// Read input file into array
const initialState = fs
  .readFileSync("day6-input.txt", "utf8")
  .toString()
  .split(",")
  .map(Number);

function tick(fishesState) {
  const newState = [...fishesState];
  for (let i = 0; i < fishesState.length; i++) {
    const fishState = fishesState[i];
    if (fishState === 0) {
      newState[i] = 6;
      newState.push(8);
    } else {
      newState[i] -= 1;
    }
  }
  return newState;
}

const DAYS_TO_RUN = 80;
function run() {
  let currentState = [...initialState];
  console.log("initial state", currentState);
  for (let i = 0; i < DAYS_TO_RUN; i++) {
    currentState = tick(currentState);
    // console.log(`After ${i + 1} days: ${currentState}`);
  }
  console.log(
    `After ${DAYS_TO_RUN} days, there are ${currentState.length} fish.`
  );
}

run();

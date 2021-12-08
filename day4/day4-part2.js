const fs = require("fs");
// Read input file into array
const lines = fs
  .readFileSync("day4-input.txt", "utf8")
  .toString()
  .split("\n")
  .filter(Boolean);

// Get draw lines
const draw = lines[0].split(",");
// Get boards (each board is a 2d array)
const boards = [];
let board = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const lineSplit = line.split(" ").filter(Boolean);
  board.push(lineSplit);
  if (i % 5 === 0) {
    boards.push(board);
    board = [];
  }
}

// Keep track of winners data. In this case, we keep track of all winners, so we can find the latest
// winner (the last element in array)
let winnerBoardIndexes = [];
let winnerRowIndex;
let winnerColIndex;
let winnerDraw;
// Loop over all draws (until all winners are found)
for (let i = 0; i < draw.length; i++) {
  const d = draw[i];
  // Update latest draw
  winnerDraw = Number.parseInt(d, 10);
  // Replace drawn numbers with "X", in all boards, so we can find bingo's later
  for (let j = 0; j < boards.length; j++) {
    const board = boards[j];
    for (let k = 0; k < board.length; k++) {
      const row = board[k];
      for (let l = 0; l < row.length; l++) {
        const num = row[l];
        if (num === d) {
          console.log(`${d} is in board ${j} row ${k} col ${l}`);
          row[l] = "X";
        }
      }
    }
  }
  // Check for row bingo
  for (let j = 0; j < boards.length; j++) {
    const board = boards[j];
    if (winnerBoardIndexes.includes(j)) continue;
    for (let k = 0; k < board.length; k++) {
      const row = board[k];
      if (row.every((x) => x === "X")) {
        winnerBoardIndexes.push(j);
        winnerRowIndex = k;
        break;
      }
    }
  }
  // All winners found, end loop
  if (boards.length === winnerBoardIndexes.length) {
    break;
  }
  // Check for column bingo
  for (let j = 0; j < boards.length; j++) {
    const board = boards[j];
    if (winnerBoardIndexes.includes(j)) continue;
    for (let l = 0; l < 5; l++) {
      let column = [];
      for (let k = 0; k < board.length; k++) {
        const row = board[k];
        const el = row[l];
        if (el === "X") {
          column.push(el);
        }
        if (column.length === 5) {
          winnerBoardIndexes.push(j);
          winnerColIndex = l;
          break;
        }
      }
    }
  }
  // All winners found, end loop
  if (boards.length === winnerBoardIndexes.length) {
    break;
  }
}
console.log("boards", boards);
console.log("Winner Board Indexes: ", winnerBoardIndexes);

const lastWinner = winnerBoardIndexes.pop();
let sum = 0;
// sum all numbers in the winning board that are not "X"
const winnerBoard = boards[lastWinner];
for (let i = 0; i < 5; i++) {
  const row = winnerBoard[i];
  for (let j = 0; j < 5; j++) {
    const num = row[j];
    if (num !== "X") {
      sum += Number.parseInt(num, 10);
    }
  }
}
console.log("sum", sum);
console.log("winnerDraw", winnerDraw);
console.log("total", sum * winnerDraw);

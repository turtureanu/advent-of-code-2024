import fs from "fs";
import * as readline from "readline";

const fileStream = fs.createReadStream("./input.txt");

const rl = readline.createInterface({
  input: fileStream,
});

// arrays to make for the left and right column
const leftColumn = [];
const rightColumn = [];

// using regex parse each line and push the values to the respective arrays
for await (const line of rl) {
  const leftRegex = /^\d+/;
  const rightRegex = /\d+$/;

  leftColumn.push(Number(line.match(leftRegex)[0]));
  rightColumn.push(Number(line.match(rightRegex)[0]));
}

// sort the arrays
leftColumn.sort((a, b) => a - b);
rightColumn.sort((a, b) => a - b);

let sum = 0;

// for each element in the leftColumn see how apart it
// is from the one at the same index from the right array
for (let i = 0; i < leftColumn.length; i++) {
  sum += Math.abs(leftColumn[i] - rightColumn[i]);
}

console.log(sum);

import fs from "fs";
import * as readline from "readline";

const fileStream = fs.createReadStream("./input.txt");

const rl = readline.createInterface({
  input: fileStream,
});

let safeCount = 0;

// go over each line
for await (const line of rl) {
  // get the numbers from the line into the report[]
  let report = line.split(" ");

  // variable that tells us if the line is descending
  let desc = true;

  // assume the line is safe
  let isSafe = true;

  // iterate over the report[]
  for (let i = 0; i < report.length; i++) {
    let current = report[i];
    let previous = report[i - 1];

    if (i !== 0) {
      // if it's descending by 1, 2, or 3
      if (previous - current >= 1 && previous - current <= 3) {
        if (desc === false) {
          // if it was marked as ascending at some point
          isSafe = false;
        }
        // if it's ascending by 1, 2, or 3
      } else if (current - previous >= 1 && current - previous <= 3) {
        if (i === 1) {
          // ovewrite the default
          desc = false;
        } else if (desc === true) {
          // if it was marked as descending at some point
          isSafe = false;
        }
      } else {
        // if the difference was less than 1 or greater than 3
        isSafe = false;
      }
    }
  }

  // if the line is safe increment the safe counter
  isSafe && safeCount++;
}

console.log(safeCount);

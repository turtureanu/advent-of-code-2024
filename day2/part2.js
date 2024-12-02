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
  const report = line.split(" ");

  // check if the provided array (line) is safe
  const check = (arr) => {
    // assume the line is descending
    let desc = true;

    // assume the line is safe
    let isSafe = true;

    // iterate over the provided array
    for (let i = 0; i < arr.length; i++) {
      let cur = arr[i];
      let prev = arr[i - 1];

      if (i !== 0) {
        // descending by 1, 2, or 3
        if (prev - cur >= 1 && prev - cur <= 3) {
          if (desc === false) {
            // if it was marked as ascending at some point
            isSafe = false;
          }
          // if it's ascending by 1, 2, or 3
        } else if (cur - prev >= 1 && cur - prev <= 3) {
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

    return isSafe;
  };

  // remove one element from the array
  // then remove another one instead
  // repeats until we get all the combinations
  for (let i = 0; i < report.length; i++) {
    const removed = [...report.slice(0, i), ...report.slice(i + 1)];

    // if at least one of the combinations is valid, we know it can be considered safe
    if (check(removed)) {
      safeCount++;
      break;
    }
  }
}

console.log(safeCount);

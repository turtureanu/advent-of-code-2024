import fs from "fs";
import * as readline from "readline";

import _ from "lodash";

const fileStream = fs.createReadStream("./input.txt");

const rl = readline.createInterface({
  input: fileStream,
});

const leftColumn = [];
const rightColumn = [];

for await (const line of rl) {
  const leftRegex = /^\d+/;
  const rightRegex = /\d+$/;

  leftColumn.push(Number(line.match(leftRegex)[0]));
  rightColumn.push(Number(line.match(rightRegex)[0]));
}

// using Lodash we can create an Object that acts as a Map, which counts the number of occurences for us
const rightOccurences = _.countBy(rightColumn);

let sum = 0;

// for each element see if it occurs more than once and then push that to the sum
for (const e of leftColumn) {
  sum += rightOccurences[e.toString()] ? e * rightOccurences[e.toString()] : 0;
}

console.log(sum);

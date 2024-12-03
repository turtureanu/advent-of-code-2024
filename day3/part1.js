import fs from "fs";
import * as readline from "readline";

const fileStream = fs.createReadStream("./input.txt");

const rl = readline.createInterface({
  input: fileStream,
});

let sum = 0;

for await (const line of rl) {
  // match each valid instacen of map(X,Y), where X or Y are 1 to 3 digit numbers
  let instructions = [...line.match(/mul\(\d{1,3},\d{1,3}\)/g)];

  const getResult = (str) => {
    // for a match get each of the numbers
    let numbers = str.match(/\d+/g);
    // then multiply them and add the result to the sum
    sum += numbers[0] * numbers[1];
  };
  // for each match
  instructions.map((e) => getResult(e));
}
console.log(sum);

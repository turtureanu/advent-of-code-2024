import fs from "fs";
import * as readline from "readline";

const fileStream = fs.createReadStream("./input.txt");

const rl = readline.createInterface({
  input: fileStream,
});

let sum = 0;
let enabled = true; // multiplication toggle

for await (const line of rl) {
  // match the mul(X,Y), do(), and don't() instructions
  let instructions = [
    ...line.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g),
  ];

  const getResult = (str) => {
    let numbers = str.match(/\d+/g);
    sum += numbers[0] * numbers[1];
  };

  // iterate over the instructions
  instructions.map((e) => {
    // toggle the multiplication
    if (e === "do()") {
      enabled = true;
    } else if (e === "don't()") {
      enabled = false;
    }
    // run mul(X,Y) instructions through the getResult()
    if (enabled && e !== "do()" && e !== "don't()") {
      getResult(e);
    }
  });
}
console.log(sum);

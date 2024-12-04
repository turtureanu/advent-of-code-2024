import fs from "fs";

// open the file
fs.readFile("./input.txt", "utf-8", (err, fileContents) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = fileContents.split("\n");

  // iterate over each line

  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    // check left and right
    if (lines[i].match(/XMAS/)) {
      lines[i].match(/XMAS/g).map((e) => sum++);
    }

    if (lines[i].match(/SAMX/)) {
      lines[i].match(/SAMX/g).map((e) => sum++);
    }

    if (i < lines.length - 3) {
      // check up and down
      for (let j = 0; j < lines[i].length; j++) {
        const l =
          lines[i][j] + lines[i + 1][j] + lines[i + 2][j] + lines[i + 3][j];
        if (l === "XMAS" || l === "SAMX") {
          sum++;
        }
      }

      // check diagonally '-.
      for (let j = 0; j < lines[i].length; j++) {
        const l =
          lines[i][j] +
          lines[i + 1][j + 1] +
          lines[i + 2][j + 2] +
          lines[i + 3][j + 3];
        if (l === "XMAS" || l === "SAMX") {
          sum++;
        }
      }

      // check diagonally .-'
      for (let j = 0; j < lines[i].length; j++) {
        const l =
          lines[i][j] +
          lines[i + 1][j - 1] +
          lines[i + 2][j - 2] +
          lines[i + 3][j - 3];
        if (l === "XMAS" || l === "SAMX") {
          sum++;
        }
      }
    }
  }
  console.log(sum);
});

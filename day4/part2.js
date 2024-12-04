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

  for (let i = 0; i < lines.length - 2; i++) {
    for (let j = 0; j < lines[i].length - 2; j++) {
      let firstDiag = false;
      // diagonal '-.
      const diagTL = lines[i][j] + lines[i + 1][j + 1] + lines[i + 2][j + 2];
      if (diagTL === "MAS" || diagTL === "SAM") {
        firstDiag = true;
      }

      // diagonal .-' but with the same center
      const diagBL = lines[i][j + 2] + lines[i + 1][j + 1] + lines[i + 2][j];
      if ((diagBL === "MAS" || diagBL == "SAM") && firstDiag) {
        sum++;
      }
    }
  }
  console.log(sum);
});

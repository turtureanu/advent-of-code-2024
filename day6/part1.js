import fs from "fs";

// open the file
fs.readFile("./input.txt", "utf-8", (err, fileContents) => {
  if (err) {
    console.error(err);
    return;
  }
  let lines = [];
  fileContents.split("\n").map((e) => lines.push(e.split("")));

  let sum = 0;

  let guardPos = [];

  // find the guard position
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "^") {
        guardPos = [i, j];
        break;
      }

      if (guardPos.length !== 0) {
        break;
      }
    }
  }

  let isGone = false;
  let direction = "top"; // top, right, bottom, left

  while (!isGone) {
    let guardY = guardPos[0];
    let guardX = guardPos[1];
    switch (direction) {
      case "top": {
        // go up from guardY
        for (let i = guardY; i > 0; i--) {
          // if the next element is not an obstacle
          if (lines[i - 1][guardX] !== "#") {
            if (lines[i][guardX] !== "X") sum++;
            // if it is the edge
            if (i - 1 === 0) {
              isGone = true;
              break;
            }
            lines[i][guardX] = "X";
          } else {
            // if there is an obstacle
            if (lines[i][guardX] !== "X") sum++;
            lines[i][guardX] = "X";
            direction = "right";
            guardPos = [i, guardX];
            break;
          }
        }
        break;
      }
      case "right": {
        // go right
        for (let j = guardX; j < lines[guardY].length; j++) {
          if (lines[guardY][j + 1] !== "#") {
            if (lines[guardY][j] !== "X") sum++;
            if (j === lines[guardY].length - 1) {
              isGone = true;
              break;
            }
            lines[guardY][j] = "X";
          } else {
            if (lines[guardY][j] !== "X") sum++;
            lines[guardY][j] = "X";
            direction = "bottom";
            guardPos = [guardY, j];
            break;
          }
        }
        break;
      }
      case "bottom": {
        // go down
        for (let i = guardY; i < lines.length; i++) {
          if (i === lines.length - 1) {
            lines[i][guardX] = "X";
            sum++;
            isGone = true;
            break;
          }

          if (lines[i + 1][guardX] !== "#") {
            if (lines[i][guardX] !== "X") sum++;
            lines[i][guardX] = "X";
          } else {
            if (lines[i][guardX] !== "X") sum++;
            lines[i][guardX] = "X";
            direction = "left";
            guardPos = [i, guardX];
            break;
          }
        }
        break;
      }
      case "left": {
        // go right
        for (let j = guardX; j > 0; j--) {
          if (lines[guardY][j - 1] !== "#") {
            if (lines[guardY][j] !== "X") sum++;
            if (j === 1) {
              isGone = true;
              break;
            }
            lines[guardY][j] = "X";
          } else {
            if (lines[guardY][j] !== "X") sum++;
            lines[guardY][j] = "X";
            direction = "top";
            guardPos = [guardY, j];
            break;
          }
        }
        break;
      }
    }
  }

  console.log(sum);
});

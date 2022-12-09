const fs = require("fs");

fs.readFile("input2.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let arr = data.split("\n");

  let score = 0;

  for (let i = 0; i < arr.length; i++) {
    score += whoWon(arr[i][0], arr[i][2]);
  }

  console.log(score);
});

// Rock, paper, scissors
// A, B, C
// X, Y, Z
// 1, 2, 3

// Lose, Draw, Win

// 0, 3, 6

function whoWon(input1, input2) {
  if (input1 === "A") {
    if (input2 === "X") {
      return 3 + 0
    } else if (input2 === "Y") {
      return 1 + 3
    } else if (input2 === "Z") {
      return 2 + 6
    }
  } else if (input1 === "B") {
    if (input2 === "X") {
      return 1 + 0
    } else if (input2 === "Y") {
      return 2 + 3
    } else if (input2 === "Z") {
      return 3 + 6
    }
  } else if (input1 === "C") {
    if (input2 === "X") {
      return 2 + 0
    } else if (input2 === "Y") {
      return 3 + 3
    } else if (input2 === "Z") {
      return 1 + 6
    }
  }
}

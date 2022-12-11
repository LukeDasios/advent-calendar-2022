const fs = require("fs");

fs.readFile("input4.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let arr = data.split("\n");
  let grid = []

  for (let i = 0; i < arr.length; i++) {
    grid.push(arr[i].split(""))
  }

  

});

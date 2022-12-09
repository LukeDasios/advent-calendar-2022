const fs = require("fs");

fs.readFile("input4.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let arr = data.split("\n");
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i].split(",");
    let arr3 = temp[0].split("-"),
      arr4 = temp[1].split("-");
    let num1 = parseInt(arr3[0]),
      num2 = parseInt(arr3[1]),
      num3 = parseInt(arr4[0]),
      num4 = parseInt(arr4[1]);

    if (num1 >= num3 && num1 <= num4) {
      count++
    } else if (num3 >= num1 && num3 <= num2) {
      count++
    }
  }

  console.log(count);
});

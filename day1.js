const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let arr = data.split("\n")
  let count = 0
  let max1 = -Infinity, max2 = -Infinity, max3 = -Infinity

  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i]

    if (temp === "") {
      if (count > max1) {
        max3 = max2
        max2 = max1
        max1 = count
      } else if (count > max2) {
        max3 = max2
        max2 = count
      } else if (count > max3) {
        max3 = count
      }
      count = 0
    } else {
      count += parseInt(temp)
    }
  }

  console.log(max1 + max2 + max3)
});

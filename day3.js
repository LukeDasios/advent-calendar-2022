const fs = require("fs");

fs.readFile("input3.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let arr = data.split("\n");

  let priority = new Map()
  let alphabet = ["a", "b", "c" ,"d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

  for (let i = 0; i < alphabet.length; i++) {
    priority.set(alphabet[i], i + 1)
    priority.set(alphabet[i].toUpperCase(), 27 + i)
  }

  let sum = 0;

  for (let i = 0; i < arr.length; i += 3) {
    let temp1 = arr[i]
    let temp2 = arr[i + 1]
    let temp3 = arr[i + 2]

    let map1 = new Map()
    let map2 = new Map()

    for (let j = 0; j < temp1.length; j++) {
      map1.set(temp1[j], 1)
    }

    for (let j = 0; j < temp2.length; j++) {
      map2.set(temp2[j], 1)
    }

    for (let j = 0; j < temp3.length; j++) {
      if (map1.has(temp3[j]) && map2.has(temp3[j])) {
        sum += priority.get(temp3[j])
        break
      }
    }
  }

  console.log(sum);
});
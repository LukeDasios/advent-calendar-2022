const fs = require("fs");

// fs.readFile("input6.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   let arr = data.split("");
//   let count = 4;

//   let window = [];
//   let first = true

//   for (let i = 0; i < arr.length; i++) {
//     let temp = arr[i]

//     if (window.length === 4) {
//       if (first) {
//         let vals = 0
//         for (let i = 0; i < window.length; i++) {
//           let tot = 0
//           for (let j = 0; j < window.length; j++) {
//             if (i !== j && window[i] === window[j]) {
//               tot = 1
//               break
//             }
//           }

//           if (tot >= 1) {
//             vals += 1
//           }
//         }

//         if (vals === 0) {
//           console.log(4)
//           console.log("DONE")
//         } else {
//           count++;
//           window.shift();
//           window.push(temp);
//         }
//         first = false
//       } else {
//         if (window.includes(temp)) {
//           count++;
//           window.shift();
//           window.push(temp);
//         } else {
//           break;
//         }
//       }
//     } else {
//       window.push(temp);
//     }
//   }

//   console.log(count);
// });

fs.readFile("input6.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let arr = data.split("");
  let map = new Map();
  let p = 14;
  let order = arr.slice(0, 14);
  let next = 0;
  let count = 14;

  for (let i = 0; i < 14; i++) {
    let temp = arr[i];

    if (map.has(temp)) {
      map.set(temp, map.get(temp) + 1);
    } else {
      map.set(temp, 1);
    }
  }

  let done = false;

  while (!done) {
    let temp = new Set();

    map.forEach((value, key) => {
      temp.add(key);
    });

    if (temp.size < 14 && count < arr.length) {
      count++;
      map.set(order[next], map.get(order[next]) - 1);
      if (map.get(order[next]) === 0) map.delete(order[next]);
      order[next] = arr[p++];
      if (map.has(order[next])) {
        map.set(order[next], map.get(order[next]) + 1);
      } else {
        map.set(order[next], 1);
      }
      next = next < 13 ? next + 1 : 0;
    } else {
      done = true;
    }
  }

  console.log(count);
});

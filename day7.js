// class Directory {
//   constructor(name, parent) {
//     this.parent = parent
//     this.name = name
//     this.children = []
//     this.size = 0
//   }

//   findDirectory(name) {
//     let children = this.children

//     for (let i = 0; i < children.length; i++) {
//       if (children[i].name === name) {
//         return children[i]
//       }
//     }
//   }

//   addFile(fileSize) {
//     this.size += fileSize
//   }

//   addChild(child) {
//     this.children.push(child)
//   }

//   getSize() {
//     let size = this.size
//     let children = this.children

//     for (let i = 0; i < children.length; i++) {
//       size += children[i].getSize()
//     }

//     return size
//   }
// }

// fs.readFile("input7.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   let arr = data.split("\n");
//   let root = new Directory(null)
//   let currentDirectory = root

//   let i = 0
//   while (i < arr.length) {
//     let input = arr[i]

//     if (input.startsWith("$ cd")) {
//       if (input.endsWith("/")) {
//         currentDirectory = root
//       } else if (input.endsWith("..")) {
//         if (currentDirectory !== root) {
//           currentDirectory = currentDirectory.parent
//         }
//       } else {
//         let newDirectory = new Directory(input.slice(4, input.length), currentDirectory)
//         currentDirectory.addChild(newDirectory)
//         currentDirectory = newDirectory
//       }
//       i++
//     } else if (input.startsWith("$ ls")) {
//       let j = i + 1
//       let temp = arr[j]

//       while (j < arr.length && !temp.startsWith("$ cd")) {
//         if (temp.startsWith("dir")) {
//           let newDirectory = new Directory(temp.slice(3, temp.length), currentDirectory)
//           currentDirectory.addChild(newDirectory)
//         } else {
//           let size = ""

//           for (let z = 0; z < temp.length; z++) {
//             if (temp[z] === " ") {
//               break
//             } else {
//               size += temp[z]
//             }
//           }

//           currentDirectory.addFile(parseInt(size))
//         }

//         j++
//       }

//       i = j
//     }
//   }

//   let array = [root]

//   while (array.length) {
//     console.log(array[0].getSize())
//     array.concat(array[0].children)
//     array.shift()
//   }
// });

class Tree {
	constructor() {
		this.view = {};
		this.pwd = [];
	}

	add(item) {
		let curDir = this.pwd.reduce((curDir, d) => curDir[d], this.view);
		curDir[item[1]] = !isNaN(item[0]) ? parseInt(item[0]) : {};
	}

	cd(name) {
		if (name === "/") this.pwd = [];
		else if (name === "..") this.pwd.pop();
		else this.pwd.push(name);
	}
}

const input = require("fs").readFileSync(`./input7.txt`, "utf-8").split("\n"),
tree = new Tree();

// Build tree
for (let i = 0; i < input.length; i++) {
	let ins = input[i].split(" ");
	if (ins[0] === "$") {
		if (ins[1] === "cd") tree.cd(ins[2]);
	} else {
		tree.add(ins);
	}
}

let dirs = {};

// Get sizes of directories
const crawl = (dir = "", branch = tree.view) => {
	let size = 0;
	for (let [k, v] of Object.entries(branch)) {
		if (!isNaN(v)) size += v;
		else size += crawl(`${dir}/${k}`, branch[k]);
	}
	dirs[dir ? dir : "/"] = size;
	return size;
};

crawl();

dirs = Object.fromEntries(Object.entries(dirs).sort((a, b) => a[1] - b[1]));

// Part 1
console.log(
	`Small directory sizes: ${Object.values(dirs)
		.filter((n) => n < 100000)
		.reduce((a, n) => a + n, 0)}`
);

let spaceNeeded = 30000000 - (70000000 - dirs["/"]),
	deleteDir = Object.keys(dirs).filter((dir) => dirs[dir] >= spaceNeeded)[0];

console.log(`Directory to delete: "${deleteDir}", Size: ${dirs[deleteDir]}`); // Part 2

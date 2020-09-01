// const Promise = require("./promise");

// import Promise from "./promise.js";
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p1");
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  resolve("p2");
});

Promise.allSettled([10, 20]).then((ret) => {
  console.log(ret);
});
// Promise.reject(9).catch((ret) => {
//   console.log("ret", ret);
// });

// Promise.race([
//   new Promise((resolve, reject) => {
//     setTimeout(() => reject(100), 1000);
//   }),
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(120), 500);
//   })
// ]).then(
//   (re) => {
//     console.log("wdqwd", re);
//   },
//   (err) => {
//     console.log("err", err);
//   }
// );

// function promiseify(callback) {
//   return function (...args) {
//     return new Promise((resolve, reject) => {
//       callback(...args, (err, data) => {
//         if (err) reject(err);
//         resolve(data);
//       });
//     });
//   };
// }

// const read = promiseify(fs.readFile);

// read("txt.txt", "utf8").then(
//   data => {
//     console.log(data);
//   },
//   r => {
//     console.log("r", r);
//   }
// );
// 常规使用 resolve(promise)
// const p = new Promise(function (resolve, reject) {
//   resolve(
//     new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(0);
//       }, 1000);
//     })
//   );
// });
// p.then((r) => {
//   console.log(r);
// }).finally(() => {
//   console.log("finally");
// });

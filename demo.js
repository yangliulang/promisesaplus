const Promise = require("./promise");

Promise.reject(9).catch((ret) => {
  console.log("ret", ret);
});

// Promise.allSettled([
//   1,
//   2,
//   new Promise((resolve, reject) => {
//     setTimeout(() => reject(100), 1000);
//   }),
//   "yangyong",
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(120), 2000);
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
// p.then(r => {
//   console.log(r);
// });

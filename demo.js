// const Promise = require("./promise");

// 常规使用1
// const p1 = new Promise(function (resolve, reject) {
//   resolve("p1 suceess.....");
// });
// p1.then((ret) => console.log("suceess:", ret));
// 常规使用2
// const p2 = new Promise(function (resolve, reject) {
//   reject("p2 reject.....");
// });
// p2.then(null, (err) => console.log("reject:", err));

// 常规使用3 返回自己
// const p3 = new Promise(function (resolve, reject) {
//   resolve("p3 success.....");
// });
// const mine = p3.then(
//   (ret) => {
//     console.log("success:", ret);
//     return mine;
//   },
//   (err) => console.log("reject:", err)
// );

// mine.then(
//   () => {},
//   (e) => {
//     console.log(e);
//   }
// );

// 常规使用 resolve(promise)
const p4 = new Promise(function (resolve, reject) {
  resolve(
    new Promise((resolve, reject) => {
      resolve(0);
    })
  );
});
const mine1 = p4.then(
  (ret) => {
    console.log("success:", ret);
    // return mine;
  },
  (err) => console.log("reject:", err)
);

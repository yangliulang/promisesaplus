const Promise = require("./promise");
// 常规使用 resolve(promise)
const p = new Promise(function (resolve, reject) {})
  // .then((r) => {
  //   return new Promise((resolve, reject) => {
  //     resolve(
  //       new Promise((resolve, reject) => {
  //         setTimeout(() => resolve(0), 1000);
  //       })
  //     );
  //   });
  // })
  .then(
    (r) => {
      console.log("----k", r);
    },
    (err) => {
      console.log(err);
    }
  );

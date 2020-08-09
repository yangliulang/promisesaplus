const Promise = require("./promise");
// 常规使用 resolve(promise)
const p = new Promise(function (resolve, reject) {
  resolve(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(0);
      }, 1000);
    })
  );
});
p.then(r => {
  console.log(r);
});

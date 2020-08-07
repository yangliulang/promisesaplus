const Promise = require("./promise");
// 常规使用 resolve(promise)
const p = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(100), 1000);
});

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
  id: 10
}

let token = jwt.sign(data,'123abc');
console.log(token);
let decode = jwt.verify(token,'123abc');
console.log('decode:',decode);
// let msg = 'I am number 4';
// let hash = SHA256(msg).toString();
// console.log(`Message: ${msg}\nHash: ${hash}`);
//
// let data = {
//   id: 4
// };
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// let resHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resHash === token.hash){
//   console.log("Data wasn't changed TRUST");
// }else {
//   console.log("Data was changed DONT TRUST");
// }

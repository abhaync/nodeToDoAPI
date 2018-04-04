const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

let id = '5abe0e0cbe7008350c310402';
// let id = '5ac350696056e52ea0b7daf811';
// if(!ObjectID.isValid(id)){
//   console.log("ID not valid");
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("Todos",todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("Todo",todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('ID not found');
//   }
//   console.log('Todo',todo);
// }).catch((err) => {
//   console.log(err);
// })
User.findById(id).then((user) => {
  if(!user){
    return console.log("User not found");
  }
  console.log("User", user);
}).catch((err) => {
  console.log(err);
})

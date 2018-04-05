const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

let id = '5abe0e0cbe7008350c310402';

Todo.findByIdAndRemove('5ac5eb9fa0b53ca8c4986f41').then((todo) => {
  console.log(todo);
})

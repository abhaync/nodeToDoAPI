const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const todos = [
  {
    _id: new ObjectID(),
    text: 'First Todo',
    _createdBy: userOneID
  },
  {
    _id: new ObjectID(),
    text: 'Second Todo',
    completed: true,
    completedAt: 333,
    _createdBy: userTwoID
  }
];

const users = [
  {
    _id: userOneID,
    email: 'abhay@example.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userOneID,
        access: 'auth'
      },'123abc').toString()
    }]
  },
  {
    _id: userTwoID,
    email: 'hamzah@example.com',
    password: 'userTwoPass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userTwoID,
        access: 'auth'
      },'123abc').toString()
    }]
  }
]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => {
    done();
  });
}

module.exports = {
  todos,
  users,
  populateUsers,
  populateTodos
}

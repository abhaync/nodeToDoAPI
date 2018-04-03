const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [
  {
    text: 'First Todo'
  },
  {
    text: 'Second Todo'
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
})

describe('POST /todos',() => {
  it('should create a new todo', (done) => {
    let text1 = 'My test todos';
    request(app)
      .post('/todos')
      .send({
        text: text1
      })
      .expect(200)
      .expect((res) =>{
        expect(res.body.text).toBe(text1);
      })
      .end((err,res) => {
        if(err){
          return done(err);
        }
        Todo.find({text: text1}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text1);
          done();
        }).catch((e) => {
          done(e);
        })
      })
  })

  it('should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send()
      .expect(400)
      .end((err,res) => {
        if(err){
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => {
          done(e);
        })
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
})

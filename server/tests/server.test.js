const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First Todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second Todo',
    completed: true,
    completedAt: 333
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

describe('GET /todos/:id', () => {
  it('should return todo doc',(done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done);
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  })

  it('should return 404 for non object ids', (done) => {
    request(app)
      .get('/todos/1234ed')
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    let hexid = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexid}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexid)
      })
      .end((err,res) => {
        if(err){
          return done(err);
        }
        Todo.findById(hexid).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((err) => {
          done(err);
        })
      });
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  })

  it('should return 404 if object is invalid', (done) => {
    request(app)
      .delete('/todos/1234ed')
      .expect(404)
      .end(done)
  })
})


describe('PATCH /todos/:id', () =>{
  it('should update todo', (done) => {
    let hexid = todos[0]._id.toHexString();
    let text = 'Updated from TEST';
    request(app)
      .patch(`/todos/${hexid}`)
      .send({
        text,
        completed: true
      })
      .expect(200)
      .end((err,res) => {
        if(err){
          return done(err);
        }

        Todo.find({text}).then((todo) => {
          expect(todo[0].text).toBe(text);
          expect(todo[0].completed).toBe(true);
          expect(typeof todo[0].completedAt).toBe('number');
          done();
        }).catch((err) => {
          done(err);
        })
      })

  })

  it('should clear completedAt when todo is not completed', (done) => {
    let hexid = todos[0]._id.toHexString();
    let text = 'Updated from TEST';
    request(app)
      .patch(`/todos/${hexid}`)
      .send({
        text,
        completed: false
      })
      .expect(200)
      .end((err,res) => {
        if(err){
          done(err);
        }

        Todo.find({text}).then((todo) => {
          expect(todo[0].text).toBe(text);
          expect(todo[0].completed).toBe(false);
          expect(todo[0].completedAt).toBeFalsy();
          done();
        }).catch((err) => {
          done(err);
        })
      })
  })
})

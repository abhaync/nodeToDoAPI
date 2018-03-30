const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connected to MongoDB server');
  let db = client.db('ToDoApp');
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // },(err,result) => {
  //   if(err){
  //     return console.log('Unable to insert to do',err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,4));
  // });
  // db.collection('Users').insertOne({
  //   name: 'Abhay',
  //   age: 22,
  //   location: 'Bangalore'
  // },(err,result) => {
  //   if(err){
  //     return console.log('Unable to insert user',err);
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,4));
  // });
  client.close();
});

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connected to MongoDB server');
  let db = client.db('ToDoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5abde299a4875d19d8ffa8de')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,4));
  // }, (err) => {
  //   console.log('Unable to fetch Todos',err);
  // })
  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos');
  //   console.log(`Todos Count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch Todos',err);
  // })
  db.collection('Users').find({
    name: 'Abhay'
  }).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs,undefined,4));
  }, (err) => {
    console.log('Unable to fetch Users',err);
  });
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
  // client.close();
});

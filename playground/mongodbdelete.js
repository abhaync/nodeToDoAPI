const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connected to MongoDB server');
  let db = client.db('ToDoApp');
  db.collection('Users').deleteMany({
    name: 'Abhay'
  }).then((result) => {
    console.log(result);
  });
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5abde4fc0ab611310468588f')
  }).then((result) => {
    console.log(result);
  })
  // client.close();
});

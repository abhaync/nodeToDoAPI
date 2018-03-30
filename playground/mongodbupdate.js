const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connected to MongoDB server');
  let db = client.db('ToDoApp');
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5abde35fa571bf04ac9f8b81')
  },{
    $set: {
      name: 'Abhay'
    },
    $inc: {
      age: -1
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })
  // client.close();
});

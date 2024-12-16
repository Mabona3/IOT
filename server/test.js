const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/lab';

MongoClient.connect(url, (err, client) => {
  console.log('Connected')
})

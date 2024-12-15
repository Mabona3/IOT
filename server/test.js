const MongoClient = require('../public/node_modules/mongodb').MongoClient;
const assert = require('../public/node_modules/assert');
const dboper = require('./operations');
const url = 'mongodb://0.0.0.0:27017/';
const dbname = 'lab';
MongoClient.connect(url, (err, client) => {
  assert.equal(err,null);
  console.log('Connected correctly to server');

  const db = client.db(dbname);
  var doc = { name: "QTP", description: "SISO"};
  dboper.insertDocument(db, doc, "processes", (result) => {
    console.log("Insert Document:\n", result. insertedCount);
    dboper.findDocuments(db, "processes", (docs) => {
      console.log("Found Documents:\n", docs);
      dboper.updateDocument(db, { name: "QTP" }, { description: "MIMO System" }, "processes", (result) => {

          console.log("Updated Document:\n", result.result);
          dboper.findDocuments(db, "processes", (docs) => {
            console.log("Found Updated Documents:\n", docs);
            dboper.removeDocument(db, { name: "QTP", description: "MIMO"},

              "processes", (result) => {

                console.log("Deleted Documents: ", result.result);
                db.dropCollection("processes", (result) => {
                  console.log("Dropped Collection: ", result);
                  dboper.findDocuments(db, "processes", (docs) => {
                    console.log("Found Documents:\n", docs);
                    client.close();

                  });
                });
              });
          });
        });
    });
  });
});

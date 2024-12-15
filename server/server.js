const express = require('../public/node_modules/express')
const morgan = require('../public/node_modules/morgan')
const MongoClient = require('../public/node_modules/mongodb').MongoClient
const assert = require('../public/node_modules/assert')
const dboper = require('./operations.js')

const url = 'mongodb://127.0.0.1:27017'
const dbname = 'lab'

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null)
  console.log('Connected correctly to server')

  const db = client.db(dbname)
  var doc = {name: "Motor", description: 'SISO', status: "undefined"}

  dboper.insertDocument(db, doc,  "processes", (err, result) => {
    console.log("Inserted Document \n", doc)
  })

  const app = express();
  const port = 3000;

  app.use(express.static(__dirname + '/../public/'))
  app.use(morgan('combined'))

  app.post('/SysOn', (_req,res) => {
    console.log('System On')
    res.status(304)
    res.end()
    doc = {name: "Motor", description: 'SISO', status: "On"}
    dpopr.updateDocument(db, {name: "Motor"},{status: "On"}, "processes", (result) => {
      console.log("Updated document " + result.result)
    })
  })

  app.post('/SysOff', (_req,res) => {
    console.log('System Off')
    res.status(304)
    res.end()
    doc = {name: "Motor", description: 'SISO', status: "Off"}
    dpopr.updateDocument(db, {name: "Motor"},{status: "Off"}, "processes", (result) => {
      console.log("Updated document " + result.result)
    })
  })

  app.listen(port, () => {
    console.log("Server running on http://localhost:3000");
  });

  dboper.removeDocument(db, doc, "processes", (err, result) => {
    db.dropCollection("processes", (result) => {
      console.log("Dropped Collection", result)
    })
  })

  client.close()
})



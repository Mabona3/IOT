import express from "express";
import morgan from "morgan";
import path from 'path';
import { MongoClient } from "mongodb";

const url = 'mongodb://127.0.0.1:27017/lab'

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected correctly to server');
});

const app = express();
const port = 3000;

app.use(express.static(path.dirname("./") + '/../public/'));
app.use(morgan('combined'));

app.post('/SysOn', (_req, res) => {
  console.log('System On');
  res.status(200).end();
  updateDocument(db, { name: "Motor" }, { status: "On" }, "processes", (err, result) => {
    if (err) {
      console.error('Error updating document:', err);
      return;
    }
    console.log("Updated document", result.result);
  });
});

app.post('/SysOff', (_req, res) => {
  console.log('System Off');
  res.status(200).end();
  updateDocument(db, { name: "Motor" }, { status: "Off" }, "processes", (err, result) => {
    if (err) {
      console.error('Error updating document:', err);
      return;
    }
    console.log("Updated document", result.result);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

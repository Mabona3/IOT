import express from 'express';
import morgan from 'morgan';
import { MongoClient } from 'mongodb';
import { insertDocument, updateDocument, removeDocument } from './operations.js';

const uri = 'mongodb://localhost:27017/lab';
const doc = { name: "Motor", description: 'SISO', status: "undefined" };

(async function() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    insertDocument(client, doc, "processes", (err, result) => {
      if (err) {
        console.error('Error inserting document:', err);
        return;
      }
      console.log("Inserted Document:", result.ops);
    });
    // Perform database operations here
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    await client.close();
  }
})();


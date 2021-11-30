const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';
async function conn() {
  const a = await MongoClient.connect(url);
}

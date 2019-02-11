const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = require('./config');
const client = new MongoClient(uri, { useNewUrlParser: true });
const setupController = require('./Controllers/setupController');

const port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
client.connect(err => {
    const collection = client.db("test").collection("devices");
    client.close();
})
setupController(app);

app.listen(port);
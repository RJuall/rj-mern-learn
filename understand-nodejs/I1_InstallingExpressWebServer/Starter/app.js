const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/', function(req, res) {
    res.send('<html><head></head><body><h1>HELLO WORLD</h1></body></html');
});

app.get('/api', function(req, res) {
    res.json({ firstname: 'John', lastname: 'Doe' });
});

app.listen(port);
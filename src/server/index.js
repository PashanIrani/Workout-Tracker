const express = require('express')
const app = express()
const path = require('path');

const PORT = 3000;

// Tells express to use static files from /dist
app.use('/dist', express.static(path.join(__dirname, './../../dist/')));

// Servers main page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});



app.listen(PORT);
const express = require('express')
const app = express()
const path = require('path');

const PORT = 3000;

const {exerciseRoutes} = require('./routes/');
// Tells express to use static files from /dist
app.use('/dist', express.static(path.join(__dirname, './../../dist/')));
app.use(express.static(path.join(__dirname, './../../public/')));

const serveIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
};

// Serve main page
app.get('/', serveIndex);
app.get('/AddWorkout', serveIndex);
app.get('/AllWorkouts', serveIndex);
app.get('/Settings', serveIndex);

exerciseRoutes(app);



app.listen(PORT);
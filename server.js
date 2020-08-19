const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));

// Nais functions
app.get(`/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

console.log('Node env: ', process.env.NODE_ENV);

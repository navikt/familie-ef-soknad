var dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();

router.use(express.static(path.join(__dirname, 'build'), { index: false }));

router.get('/status', (req, res) => {
  res.status(200).end();
});
app.get('/status', (req, res) => {
  res.status(200).end();
});

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build/', 'index.html'));
});

app.use('/familie/alene-med-barn/soknad', router);
app.listen(port, () => console.log(`Listening on port ${port}`));

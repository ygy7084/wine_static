const express = require('express');
const path = require('path');

// server setting
const app = express();
const port = process.env.PORT || 8080;

// index 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.use('/', express.static(path.join(__dirname, '../build')));

// index 라우팅
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

//
app.use((req, res) => {
  res.status(404).send('NOT FOUND');
});

// Basic error handler
app.use((err, req, res) => {
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

app.listen(port, () => {
  console.log('SERVER PORT', port);
});


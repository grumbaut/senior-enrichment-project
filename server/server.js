const express = require('express');
const app = express();
const path = require('path');

const { conn } = require('./db');

app.use(require('body-parser').json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));

app.use('/api', require('./api'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

conn.sync()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`I'm listening on port ${port}!`));
  });

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err);
});

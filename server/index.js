const express = require('express');
let app = express();
const githubAPI = require('../helpers/github.js');
const mongooseDB = require('../database/index.js');

const bodyParser = require('body-parser'); //NPM package that parses incoming request bodies in a middleware before handlers
app.use(bodyParser.urlencoded({ extended: false }));//bodyParser.urlencoded({ extended: false }) - middleware for parsing bodies from URL

const cors = require('cors');
app.use(cors());

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
const Path = require('path');
app.use(express.static(Path.join(__dirname, '/../client/dist')));


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body.username;
  githubAPI.getReposByUsername(username)
    .then((repos) => {
      mongooseDB.save(repos)
    })
    .catch((err) => {
      console.log('getReposByUsername failed', err);
    })
    .then(() => {
      res.sendStatus(201);
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  var username = req.query.username;
  mongooseDB.Repo.aggregate([
    {$sort: {forks: -1}}, {$limit: 25}
  ])
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('repos retrieve failed', err)
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
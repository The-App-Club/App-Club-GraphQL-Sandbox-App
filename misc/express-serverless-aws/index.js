const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.post("/cool", function (req, res) {
  const body = req.body
  res.send(body)
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})
module.exports.handler = serverless(app);

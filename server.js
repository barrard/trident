require('dotenv').config()
var express = require('express')
var fs = require('fs')
var http = require('http')
var https = require('https')
var app = express()

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT
app.use(express.static('public'));


app.get('/', (req, res) => {
  console.log('User his hte page')
  res.sendFile('index.html')
})

if(NODE_ENV == 'DEV'){
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}! Go to https://localhost:${PORT}/`)
  })
}else{
  http.createServer(app)
  .listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}! Go to https://localhost:${PORT}/`)
  })
}
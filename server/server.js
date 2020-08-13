const express = require('express')
const app = express()
var http = require('http').createServer(app)
const port = 8080
const path = require('path')
const bodyParser = require('body-parser');


app.use(express.static(__dirname + '/../frontend'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }));

console.log(__dirname)
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/../frontend/index.html')))


  

http.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
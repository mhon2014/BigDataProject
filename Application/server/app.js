const express = require('express')

const app = express();

const port = 8000;

app.listen(port, ()=> console.log(`Server is listening on on ${port}`))

app.get('/', function (req, res) {
    res.send('IT\'S WORKING')
  })
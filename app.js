let express = require('express')
let fs = require('fs')
let path = require('path')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let {json} = require('express')

let app = express()
mongoose.connect('mongodb://localhost/test')

app.get('/about/hh', (req, res) => {
  console.log('req',req);
  res.send('hello zhuliya12157567567321')
})

app.listen(5000, () => {
  console.log(`app is running at port 3000`);
})

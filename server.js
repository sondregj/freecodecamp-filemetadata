'use strict'

const express = require('express')
const cors = require('cors')
const multer = require('multer')

const upload = multer()

const app = express()

app.use(cors())

app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"})
})

app.post('/api/fileanalyse', upload.any(), (req, res, next) => {
  if (req.files.length < 1) {
    return res.send({error: 'Please send a file to this endpoint.'}) 
  }
  
  const file = req.files[0]
  
  return res.send({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  }) 
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...')
})

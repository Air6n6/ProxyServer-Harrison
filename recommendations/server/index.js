const express = require('express');
const path = require('path')
const controller = require('../database/dbMethods.js');

const app = express()
const port = 3002

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json())

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get("/allHomes", (req,res) => {
  console.log('getting get req inside server function');
  controller.getAllFromHomes((err,dbObj)=> {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(dbObj);
    }
  })
});
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb');

var db, collection;

const url = "mongodb+srv://sandboxer:AKZdKrMvsSZDxleU@sandboxcluster.er1seez.mongodb.net/?appName=SandboxCluster";
const dbName = "bug-tracker";

app.listen(8080, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('bugs').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { bugs: result })
  })
})

app.post('/bugs', (req, res) => {
  const currentDate = new Date();
  db.collection('bugs').insertOne({
    bug: req.body.bug,
    status: req.body.status,
    priority: req.body.priority,
    assignedTo: req.body.assigned,
    creationDate: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/bugs', (req, res) => {
  db.collection('bugs').findOneAndDelete({ "_id": ObjectId(req.body.id.trim()) }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Bug deleted!')
  })
})

app.put('/bugs/status', (req, res) => {
  db.collection('bugs')
    .findOneAndUpdate({ "_id": ObjectId(req.body.id.trim()) }, {
       $set: { status: req.body.status } 
    }, {
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

app.put('/bugs/priority', (req, res) => {
  db.collection('bugs')
    .findOneAndUpdate({ "_id": ObjectId(req.body.id.trim()) }, {
       $set: { priority: req.body.priority } 
    }, {
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})



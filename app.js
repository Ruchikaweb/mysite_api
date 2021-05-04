const express = require('express');
const app = express();
const port = process.env.PORT || 9900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');

const mongourl = "mongodb+srv://dev:mongo123@cluster0.f8vmc.mongodb.net/Mywebsite?retryWrites=true&w=majority";
let db;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//health Check
app.get('/',(req,res) => {
    res.send("Health Ok");
});

// details api//
app.post('/Customerdetails',(req,res)=>{
    db.collection('Details').insert(req.body,(err,result) => {
      if(err) throw err;
      res.send('data added');
    })
  });

//get all details
app.get('/Getdetails',(req,res) => {
    db.collection('Details').find({}).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })

//connection with mongo serer
MongoClient.connect(mongourl,(err,connection) => {
    if(err) console.log(err);
    db = connection.db('Mywebsite');
  
    app.listen(port,(err) => {
      if(err) throw err;
      console.log(`Server is running on port ${port}`)
    })
  })
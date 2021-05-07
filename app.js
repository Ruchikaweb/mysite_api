const express = require('express');
const app = express();
const port = process.env.PORT || 9900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');

var mongourl =  "mongodb+srv://ruchika:ruchika123@rest.ujhyi.mongodb.net/Mywebsite?retryWrites=true&w=majority";

let db;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//health Check
app.get('/',(req,res) => {
    res.send("Health Ok");
});

//get about api//
app.get('/About',(req,res) => {
  db.collection('Aboutpage').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//post about api//
app.post('/postabout',(req,res)=>{
  db.collection('Aboutpage').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
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

//get service details//
app.get('/Service',(req,res) => {
  db.collection('Servicepage').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//post service details//
app.post('/Postservice',(req,res)=>{
  db.collection('Servicepage').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
});

// get project //
app.get('/Project',(req,res) => {
  db.collection('Projectpage').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
});

//post project//
app.post('/Postproject',(req,res)=>{
  db.collection('Projectpage').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
});

//connection with mongo serer
MongoClient.connect(mongourl,(err,connection) => {
    if(err) console.log(err);
    db = connection.db('Mywebsite');
  
    app.listen(port,(err) => {
      if(err) throw err;
      console.log(`Server is running on port ${port}`)
    })
  })
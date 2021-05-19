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

// post subscriber api//
app.post('/Customerdetails',(req,res)=>{
    db.collection('Details').insert(req.body,(err,result) => {
      if(err) throw err;
      res.send('data added');
    })
  });

//get all Subscriber
app.get('/Getdetails',(req,res) => {
    db.collection('Details').find({}).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })

//get service details//
app.get('/Service',(req,res) => {
  db.collection('Servicepage').find({isActive:true}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
}) 

//get service with id //
app.get('/Services/:id',(req,res)=>{
  var id = mongo.ObjectID(req.params.id)
  db.collection('Servicepage').find({_id:id}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
});

//post service details//
app.post('/Postservice',(req,res)=>{
  db.collection('Servicepage').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
});

//update service
app.put('/updateservice/:id',(req,res) => {
  var id = mongo.ObjectID(req.params.id)
  db.collection('Servicepage').updateOne(
      {_id:id},
      {
          $set:{
              name:req.body.name,
              thumb:req.body.thumb,
              content:req.body.content,
              contentt:req.body.contentt
              // isActive:true
          }
      },(err,result) => {
          if(err) throw err;
          res.status(200).send('Data Updated')
      }
  )
})

//soft delete service//
app.put('/deactiveservice/:id',(req,res) => {
  var id = mongo.ObjectID(req.params.id)
  db.collection('Servicepage').updateOne(
      {_id:id},
      {
          $set:{
              isActive:false
          }
      },(err,result) => {
          if(err) throw err;
          res.status(200).send('Data Updated')
      }
  )
});

//Reactive
app.put('/activateservice/:id',(req,res) => {
  var id = mongo.ObjectID(req.params.id)
  db.collection('Servicepage').updateOne(
      {_id:id},
      {
          $set:{
              isActive:true
          }
      },(err,result) => {
          if(err) throw err;
          res.status(200).send('Data Updated')
      }
  )
}); 

//Hard delete service ///
app.delete('/deleteservice/:id',(req,res) =>{
  var id = mongo.ObjectID(req.params.id)
  db.collection('Servicepage').remove({_id:id}, (err,result) =>{
    if(err) throw err;
    res.status(200).send('deleted')
  })
}) ;

// get project //
app.get('/Project',(req,res) => {
  db.collection('Projectpage').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
});

///get project with id 
app.get('/Projects/:id',(req,res) => {
  var id =  mongo.ObjectID(req.params.id)
  db.collection('Projectpage').find({_id:id}).toArray((err,result) => {
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

//login api //
app.get('/login',(req,res)=>{
    var email = req.body.email
    var password = req.body.password
    db.collection('Admin').find({email:email,password:password}).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
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

'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//db set up
const PORT = process.env.MONGO_PORT || 3000;
// const DB = process.env.MONGO_URI || 'mongodb://localhost/db';
// const test = 'mongodb://localhost/db';
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.set('debug', true);
console.log(process.env.MONGOLAB_URI);
let models = {};
require(__dirname + '/models/blog-model.js')(mongoose, models);

//routers
app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin','http://localhost:8080');
  res.header('Access-Control-Allow-Headers','Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});

app.get('/blog/articles', (req, res)=>{
  models.Blog.find({},(err, blog)=>{
    if(err) res.json({error: err});
    res.json(blog);
  });
});

app.get('/blog/articles/:id', (req, res)=>{
  models.Blog.findOne({_id: req.params.id},(err, blog)=>{
    if(err) return res.json({error: err});
    res.json(blog);
  });
});

app.post('/admin/blog', (req, res)=>{
  console.log('rea.body : ' + JSON.stringify(req.body));
  var newBlog = new models.Blog(req.body);

  newBlog.save((err)=>{
    if(err){
      res.json({error: err});
      return;
    } else {
      res.json({msg: 'Success!'});
    }
  });
});

app.put('/admin/blog/article/:id', (req, res)=>{
  models.Blog.findOneAndUpdate({_id: req.params.id},{$set: req.body}, {new: true},(err, updatedBlog)=>{
    if(err) return res.json({error: err});
    res.json(updatedBlog);
  });
});

app.delete('/admin/blog/article/:id', (req, res)=>{
  models.Blog.findOneAndRemove({_id: req.params.id}, (err)=>{
    if(err) return res.json({error: err});
    res.json({msg: 'Success!'});
  });
});

app.listen(PORT, ()=> console.log('Backend server listening at 3000'));

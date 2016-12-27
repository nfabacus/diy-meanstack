var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// We need to require monoose models here.
var Todo = require('../models/Todos.js');

router.get('/todos.json', function(req, res, next){
  Todo.find(function(err, todos){
    if(err){ return next(err); }
    // var todos = {'text': "Hello from Express!"};
    res.json(todos);
  });
});

router.post('/todos.json', function(req, res, next) {
  var todo = new Todo(req.body);

  todo.save(function(err, todo){
    if(err){ return next(err); }

    res.json(todo);
  });
});

/* GET home page. */
router.get('/*', function(req, res, next) {
  res.render('index', { title: 'Express' });
});





module.exports = router;

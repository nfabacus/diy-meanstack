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

// router.param('todo', function(req, res, next, id) {
//   var query = Todo.findById(id);
//
//   query.exec(function (err, todo){
//     if (err) { return next(err); }
//     if (!todo) { return next(new Error('can\'t find the todo.')); }
//
//     req.todo = todo;
//     return next();
//   });
// });

router.route('/todos.json/:todo')
  .delete(function(req,res){
    Todo.findByIdAndRemove(req.params.todo, function(err, todo){
      if(err){res.send(err);}
      res.json(todo._id);
    });
  });

// just remove() does not work.....I cannot get it work.
// router.delete('/todos.json/:todo', function(req, res){
//
//   req.todo.remove().exec();
//   // , function(err){
//   //        if(err){res.send(err);}
//   //        req.json({ message: 'Successfully deleted' });
//   //        }
//   //     );
// });








/* GET home page. */
router.get('/*', function(req, res, next) {
  res.render('index', { title: 'Express' });
});





module.exports = router;

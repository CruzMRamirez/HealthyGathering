var express = require('express');
var router = express.Router();

// mongoose connection
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');


var Schema = mongoose.Schema;

// schema (blueprint)
var userDataSchema = new Schema({
  name: String,
  content: String,
  store: String
});

//model (access to the collection)
var UserData = mongoose.model('UserData', userDataSchema);

// insert (CRUD)
router.post('/insert', function(req,res,next){
  // var item = {
  //   title : "To Kill A Mockingbird",
  //   content : "This book was banned, Because it had bad words.",
  //   author : "Harper Lee"
  // };

  var item = {
    name : req.body.name,
    content : req.body.content,
    store : req.body.store
  };

  var data = new UserData(item);

  data.save();
  res.redirect('/test');

});

//get data
router.get('/get-data', function(req,res,next){
  UserData.find()
    .then(function(doc){
      res.render('index', {items: doc});
    });
});

// get (CRUD)
router.get('/data', function(req,res,next){
  UserData.find()
    .then(function(doc){
      res.render('data', {items: doc});
    });
});

//delete (CRUD)
router.post('/delete', function(req,res,next){
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/test');
});

//delete button
router.get('/deletebtn/:id', function(req,res,next){
  var id = req.params.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/test');
});

// Update (CRUD)
router.post('/update', function(req,res,next){
  var id = req.body.id;

UserData.findById(id, function(err,doc){
    if(err) {console.error('Error 404, Entry Not Found');}

    doc.name = req.body.name;
    doc.content = req.body.content;
    doc.store = req.body.store;
    doc.save();
  });
  res.redirect('/test');
});
/* GET new page */
router.get('/new', function(req, res, next) {
  res.render('new', { items: {} });
});

/* GET delete page */
router.get('/deletedoc', function(req, res, next) {
  res.render('deletedoc', { items: {} });
});






/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { items: {} });
});

// router.get('/test', function(req, res, next) {
//   res.render('test', { items: {} });
// });

router.get('/test', function(req, res, next) {
  UserData.find()
  .then(function(doc){
    res.render('test', {items: doc});
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'contact' });
});

router.get('/list', function(req, res, next) {
  res.render('list', { title: 'list' });
});

router.get('/preferences', function(req, res, next) {
  res.render('preferences', { title: 'preferences' });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'profile' });
});

router.get('/find', function(req, res, next) {
  UserData.find()
  .then(function(doc){
    res.render('find', {items: doc});
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});




router.post('/searchData', function(req,res,next){
  var search = req.body.search;
  UserData.find().or([{name: search}, {content: search}, {store: search}])
    .then(function(doc){
      res.render('find', {items: doc});
    });
});



module.exports = router;

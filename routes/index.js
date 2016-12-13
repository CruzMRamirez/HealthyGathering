var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: 'test' });
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

router.get('/search', function(req, res, next) {
  res.render('search', { title: 'search' });
});

module.exports = router;

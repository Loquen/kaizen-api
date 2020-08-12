var express = require('express');
var router = express.Router();

/* GET Home Page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET About Page
router.get('/about', (req, res, next) => {
  res.render('about');
});

// GET Kaizen Page
router.get('/kaizen', (req, res, next) => {
  res.render('kaizen');
});

// GET Field Page
router.get('/field', (req, res, next) => {
  res.render('field');
});

module.exports = router;

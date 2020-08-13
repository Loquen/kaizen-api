var express = require('express');
var router = express.Router();

/* POST route for Kaizen form. */
router.post('/kaizen', (req, res, next) => {
  console.log(req.body);
  res.redirect('/success');
});

router.post('/field', (req, res, next) => {
  console.log(req.body);
  res.redirect('/success');
})
module.exports = router;

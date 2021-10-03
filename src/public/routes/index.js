const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {
  });
});

router.get('/about', async (req, res) => {
    res.render('about', {
    });
  });

  router.get('/contact', async (req, res) => {
    res.render('contact', {
    });
  });

  router.get('/event', async (req, res) => {
    res.render('event', {
    });
  });

module.exports = router;
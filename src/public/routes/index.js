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

  router.get('/cats', async (req, res) => {
    res.render('cats', {
    });
  });

module.exports = router;
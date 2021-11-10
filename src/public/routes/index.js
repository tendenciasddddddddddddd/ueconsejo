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
  router.get('/galeria', async (req, res) => {
    res.render('galeria', {
    });
  });

module.exports = router;
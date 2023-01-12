const router = require('express').Router();
const path = require('path');
const sessionChecker = require('../utils/help')

// Loads homepage
router.get('/', async (req, res) => {

  res.render('landing');
});

// load user signup page
router.get ('/signup', (req, res) => {
        res.render('signup');
    })

//load login page
router.get ('/login', (req, res) => {
  res.render('login');
})

//load search results
router.get ('/search', (req, res) => {
  res.render('search');
})

//load upload page
router.get ('/upload', (req, res) => {
  res.render('upload');
})

//edit-profile page
router.get('/edit-profile', sessionChecker, (req, res) => {
        res.render('edit-profile');
    });

// route for handling 404 requests(unavailable routes)
router.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  });
  

  module.exports= router;
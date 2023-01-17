const router = require('express').Router();
const path = require('path');
const sessionChecker = require('../utils/help')
const { Users, Art } = require('../models');

// Loads homepage
router.get('/', async (req, res) => {

  res.render(
    'landing',
    {logged_in: req.session.logged_in,}
    );
});

// load user signup page
router.get ('/signup', (req, res) => {
        res.render('signup');
    });

//load login page
router.get ('/login', (req, res) => {
  res.render('login');
});

//load search results
router.get ('/search', (req, res) => {
  res.render(
    'search',
    {searchbyUser});
});

//load dashboard
router.get ('/dashboard', sessionChecker, async (req, res) => {try {
  const dbUserArt= await Art.findAll({
      where: {
          artist_key: req.session.user_id,
      },
  });
  const userArt = dbUserArt.map((userArtwork) =>
      userArtwork.get({ plain: true })
    );
  res.render('dashboard', {
    userArt
  })
  //res.status(200).json(searchByUser)
   //HOW TO DISPLAY ALL ART (FOR EACH?)
 //res.sendFile(path.join(`${__dirname}/../views/index.html`));
 
} catch(err){
  res.status(400).json(err);
}

})

//load upload page
router.get ('/upload', sessionChecker, (req, res) => {
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
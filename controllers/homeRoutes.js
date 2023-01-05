const router = require('express').Router();
const sessionChecker = require('../utils/help')
//DEFINE hbsContent REQUIRE FILES?

// route for Home-Page
router.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});

// route for user signup page
router.get ('/signup', (req, res) => {
        //res.sendFile(__dirname + '/public/signup.html');
        res.render('signup', hbsContent);
    })

// route for handling 404 requests(unavailable routes)
router.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  });

  module.exports= router
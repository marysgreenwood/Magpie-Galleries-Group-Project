const Artist = require('../models/Artist');


const router = require('express').Router();
const cookieParser = require('cookie-parser');
//const path = require('path');

const artists = [

  {
    username: "Coolin",
    email: "mcmurtraycolin@gmail.com",
    password: "thisPassword"
  },
  {
    username: "Lexie",
    email: "LexFinnaFlex420@gmail.com",
    password: "Thatpassword"
  },

]

var hbsContent = {
  username: '',
  logginIn: false,
  title: 'You are not logged in',
  body: 'Sup Biyatch'
}

var sessionChecker = ((req, res, next) => {
  if (req.cookies.user_sid && !req.session.Artist) {
    res.redirect('/dashboard')
  }else {
    next()
  }
})

router.use(cookieParser)

router.get('/signup', async (req, res) => {
  res.render('signup', hbsContent)
})

router.post('/signup', async (req, res) => {
  await Artist.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
})

// allow user to login
router.get('/login', async (req, res) => {
  res.render('login', hbsContent)
})

router.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  Artist.findOne({where: {username: username}}).then(function (user) {
    if (!user) {
      res.redirect('/login');
      console.log('invalid USER')
    }
    else if (!user.validPassword(password)){
      res.redirect('/login');
      console.log('password INCORRECT')
    }
    else {
      req.session.user = user.dataValues;
      res.redirect('/dashboard')
    }
  })

})

router.get('/dashboard', (req, res) => {
  if (req.session.Artist && req.cookies.user_sid) {
    hbsContent.logginIn = true;
    hbsContent.username = req.session.username;
    hbsContent.title = "You're logged in";
    res.render('index', hbsContent)
  }
  else {
    res.redirect('/login')
  }
})

router.get('/logout', (req, res) =>{
  if(req.session.user && req.cookies.user_sid) {
    hbsContent.logginIn = false;
    hbsContent.title = "You're logged out";
    res.clearCookie('user_sid');
    res.redirect('/')
  }
  else {
    res.redirect('/login')
  }
})

module.exports = router;

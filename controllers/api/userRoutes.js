const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Art } = require('../../models');

//get route to find works by artist

router.post('/newUser', async (req, res) => {
    try {
      const newUser = req.body;
      // hash the password from 'req.body' and save to newUser
      newUser.password = await bcrypt.hash(req.body.password, 10);
      // create the newUser with the hashed password and save to DB
      const userData = await User.create(newUser);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//USER LOGOUTS--MAKE DECISIONS!
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// route for user logout
router.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
  hbsContent.loggedin = false; 
  hbsContent.title = "You are logged out!"; 
      res.clearCookie('user_sid');
  console.log(JSON.stringify(hbsContent)); 
      res.redirect('/');
  } else {
      res.redirect('/login');
  }
});
//END LOGOUT ROUTES

// route for user's dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
  hbsContent.loggedin = true; 
  hbsContent.userName = req.session.user.username; 
  //console.log(JSON.stringify(req.session.user)); 
  console.log(req.session.user.username); 
  hbsContent.title = "You are logged in"; 
      //res.sendFile(__dirname + '/public/dashboard.html');
      res.render('index', hbsContent);
  } else {
      res.redirect('/login');
  }
});




module.exports = router;
const router = require('express').Router();
const { Users, Art } = require('../../models');
const sessionChecker = require('../../utils/help')

//for route testing purposes only
router.get('/all', async (req, res) => {
  try {
    var userList = await Users.findAll();
    res.status(200).json(userList);
  } catch(err) {
    res.status(400).json(err);
  }
})
//route for user signup
router.post('/newUser', async (req, res) => {
    try {
      const newUser = req.body;
      // create the newUser with the hashed password and save to DB
      const userData = await Users.create(newUser);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //login route
router.post('/login', async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { username: req.body.username } });
    console.log (userData)
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
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      console.log (req.session)
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// route for user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    console.log(req.session.user_id)
    req.session.destroy(() => {
      res.status(204).end();
      console.log("logout successful")
    });
  } else {
    res.status(404).end();
  }
});


// route for user's dashboard
router.get('/dashboard', sessionChecker, (req, res) => { 
  res.render ('index')
})


// Route for user editing profile
router.put ('/edit', async (req, res) => {
  console.log(req.body);
  try {
    
    var userData = {};
    userData.username = req.body.username;
    if (req.body.firstPassword == req.body.secondPassword){
      userData.password= firstPassword
    }else {
      res.redirect('/edit')
    }
    const userUpdate = await Users.update( userData,
      {
      where: {
        id: req.session.user_id,
      }
    })
    res.status(200).json(userUpdate);
  } catch (err) {
    res.status(400).json(err);
    console.log (err);
  }
})
/*router.post('/edit-profile', async (req, res) => {
    var username = req.body.username;
    var validPassword = await userData.checkPassword(req.body.oldPassword);
    var firstPW = req.body.firstPassword;
    var secondPW = req.body.secondPassword;
    User.findOne({ where: { id:req.session.user_id } }).then(function (user) {
    if (!firstPW == secondPW) {
        res.redirect('/edit-profile');
    }
    else if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    else{
        user.update(
            {
                username: username,
                password: firstPW,
              },
              {
                where: {
                  email: email,
                },
              }
            )
              .then(() => {
                res.redirect('/dashboard')
              })
              .catch((err) => res.json(err));
          }
    })
        }); */ 


module.exports = router;

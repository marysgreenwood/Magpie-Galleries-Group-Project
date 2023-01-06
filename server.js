//app.use(require('./controllers/artist-routes'));

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./models/artist');
var exphbs = require('express-handlebars'); 
var path = require('path'); 

// invoke an instance of express application.
var app = express();
var hbs = exphbs.create({ /* config */ })

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set our application port
app.set('port', 9000);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// handle bars config
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs'); 
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

var hbsContent = {userName: '', userEmail: '', loggedin: false, title: "You are not logged in today", body: "Hello World"}; 

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
		
        res.redirect('/dashboard');
    } else {
        next();
    }    
};


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});


// route for user signup
app.route('/signup')
    //.get(sessionChecker, (req, res) => {
    .get((req, res) => {
        //res.sendFile(__dirname + '/public/signup.html');
        res.render('signup', hbsContent);
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });

// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        //res.sendFile(__dirname + '/public/login.html');
        res.render('login', hbsContent);
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });


// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
		hbsContent.loggedin = true; 
        hbsContent.userEmail = req.session.user.email;
		hbsContent.userName = req.session.user.username;  
		hbsContent.title = "You are logged in"; 
        //res.sendFile(__dirname + '/public/dashboard.html');
        res.render('index', hbsContent);
    } else {
        res.redirect('/login');
    }
});


// route for user logout
app.get('/logout', (req, res) => {
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

// route for user editting profile
app.route('/edit-profile')
    //.get(sessionChecker, (req, res) => {
    .get((req, res) => {
        //res.sendFile(__dirname + '/public/signup.html');
        res.render('edit-profile', hbsContent);
    })
    .post((req, res) => {
    var email =  req.session.user.email;
    var username = req.body.username;
    var oldPassword = req.body.oldPassword;
    var firstPW = req.body.firstPassword;
    var secondPW = req.body.secondPassword;
    User.findOne({ where: { email: email } }).then(function (user) {
    if (!firstPW == secondPW) {
        res.redirect('/edit-profile');
    }
    else if (!user.validPassword(oldPassword)) {
        res.redirect('/edit-profile');
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
        });    

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


// start the express server
app.listen(app.get('port'), () => console.log(console.log(`Server listening on: http://localhost:${app.get('port')}`)));
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.get('/changepass', function (req, res, next) {
  res.render('changepass');
});
 
router.post('/changepass', function (req, res, next) {
  var currentpassword = req.body.txt1;
  var newpassword = req.body.txt2;
  var confirmpassword = req.body.txt3;
  
  if(req.session.password != "")
  {
    //"res.send(req.session.password + " " + currentpassword + " " + newpassword + " " + confirmpassword)
    if(currentpassword == req.session.password){
      console.log(" First Session Value is" + req.session.password);
      if(newpassword == confirmpassword){
        console.log("Second Session Value is" + req.session.password);
        req.session.password = newpassword;
        res.send("Password done");
      }else {
        res.send("wrong password");
    }
  }else {
    res.send("check password");
  }
}else{
  res.redirect('/login');
}
});

router.post('/signup', function (req, res, next) {
  var email = req.body.txt2;
  var password = req.body.txt3;
   req.session.email = email;
  req.session.password = password;
  console.log("Session Value is " + req.session.mysess);
  res.redirect("/login");

});

router.post('/login', function (req, res, next) {
  var email = req.body.txt1;
  var password = req.body.txt2;
  if (email == req.session.email && password == req.session.password) {
    console.log("Session Value is " + req.session.email);
    res.redirect("/home");

  } else {
    res.send("Error Password Wrong");
  }
});

router.get('/home', function (req, res, next) {
  if (req.session.email) {
    var username = req.session.email;
    res.render('home', { myvalue: username });
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/login');
  })
});

router.get('/counterdemo', function (req, res, next) {
  if (req.session.counter != undefined) {
    var a = req.session.counter;
    var newvalue = a + 1;
    req.session.counter = newvalue;
    res.render('home1', { myvalue: a });
  }
  else {
    req.session.counter = 0;
    a = 1;
    res.render('home1', { myvalue: a });
  }

});

router.get('/counter', function (req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }

});

module.exports = router;

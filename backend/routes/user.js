const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const Post = require('../models/post');
const router = express.Router();
const User = require("../models/user");

// router.post("/api/posts", (req, res, next) => {
//   const post = new Post({
//     inputmsg1: req.body.inputmsg1,
//     inputmsg2:  req.body.inputmsg2,
//     result:  req.body.result
//   });
//   console.log(post);
//   // res.status(201).json({
//   //   message: 'post added succesfuly'
//   // });
// });

// router.get('/get-data', function(req, res, next){
//   var ResultArray =[];
//   var cursor = db.collection(user-data).find();
//   cursor.forEach(function(doc, err) {
//     assert.equal(null, err);
//     ResultArray.push(doc);
//   }, function(){
//     res.render('post-create' , {items, ResultArray});
//   }
//   );
// });


// router.post("/insert", function(req, res, next)  {
//   console.log('item inserted');
//   var item = {
// inputmsg1: req.body.inputmsg1,
// inputmsg2: req.body.inputmsg2,
// result: req.body.result
// };
// db.collection('user-data').insertOne(item, function(err, result){
// assert.equal(null, error);
// console.log('item inserted');


// })
// });

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      delete fetchedUser.password;
      res.status(200).json({
        user: fetchedUser,
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;


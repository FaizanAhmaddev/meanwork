const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require('../models/post');
// const mongoose = require('mongoose');

// const Post = mongoose.model('Post');

const router = express.Router();

router.post("/create", async (req, res, next) => {

  if (!req.body.email || !req.body.inputmsg1 || !req.body.inputmsg2 || !req.body.result) {
    res.status(400).send({
      message: 'Requires two strings and a result.'
    });
  }

  // const post = new Post({

  // });
  const query = {
    email: req.body.email
  };
  const newData = {
    email: req.body.email,
    inputmsg1: req.body.inputmsg1,
    inputmsg2: req.body.inputmsg2,
    result: req.body.result || "",
  }

  try {
    await Post.findOneAndUpdate(query, newData, {
      upsert: true
    });
    res.status(201).json({
      message: 'post added succesfuly'
    });
  } catch (error) {
    res.status(400).send({
      message: 'Error adding post'
    })
  }

});

router.get("/get", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      email: req.query.email
    }).lean();
    if (post) {
      res.status(200).send({
        message: 'Post Fetched',
        data: post
      })
    } else {
      res.status(204).send({
        message: 'No post found for given email',
      });
    }
  } catch (error) {
    res.send(400).send({
      message: 'Error while fetching post',
    })
  }

});

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../models/Post");
const Profile = require("../models/Profile");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// @route       Get posts/test
// @desc        Tests post route
// @access      Public.
router.get("/test", (req, res) =>
  res.json({
    msg: "post works",
  })
);

// @route       Get /posts
// @desc        To see all post
// @access      Public.
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "Posts not found" }));
});

// @route       Post /posts/:id
// @desc        To see a single post
// @access      Public.
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found by this ID" })
    );
});

// @route       Post /posts
// @desc        Create post
// @access      Private.
router.post(
  "/",
  passport.authenticate("jwt", { Session: false }),
  (req, res) => {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      user: req.user.id,
    });

    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => console.log(err));
  }
);

// @route       Delete /posts/:id
// @desc        To see a single post
// @access      Private.
router.delete(
  "/:id",
  passport.authenticate("jwt", { Session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id).then((post) => {
        console.log(post.user + " " + req.user.id);
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: "User in not authorized" });
        }

        post
          .remove()
          .then(() => res.json({ success: true }))
          .catch((err) =>
            res.status(404).json({ postnotfound: "No post found " })
          );
      });
    });
  }
);

//export this router to use in our server.js
module.exports = router;

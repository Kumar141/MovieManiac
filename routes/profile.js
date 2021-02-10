const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../models/Profile");
const User = require("../models/User");

// @route       Get profile/test
// @desc        Tests users route
// @access      Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile works",
  })
);

// @route       Get profile
// @desc        Get current users' profile
// @access      Private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
      user: req.user.id,
    })
      .populate("users", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route       Post profile
// @desc        Create or edit user profile
// @access      Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const profileFields = {};

    profileFields.user = req.user.id;

    if (req.body.name) profileFields.name = req.body.name;

    if (req.body.bio) profileFields.bio = req.body.bio;

    if (typeof req.body.genres !== "undefined") {
      profileFields.genres = req.body.genres.split(",");
    }

    if (typeof req.body.favs !== "undefined") {
      profileFields.favs = req.body.favs.split(",");
    }

    Profile.findOne({
      user: req.user.id,
    }).then((profile) => {
      if (profile) {
        Profile.findOneAndUpdate(
          {
            user: req.user.id,
          },
          {
            $set: profileFields,
          },
          {
            new: true,
          }
        ).then((profile) => res.json(profile));
      } else {
        new Profile(profileFields).save().then((profile) => res.json(profile));
      }
    });
  }
);

//export this router to use in our server.js
module.exports = router;

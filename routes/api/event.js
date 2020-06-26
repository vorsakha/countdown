const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const Event = require("../../models/Event");
const User = require("../../models/User");

// @route   GET api/event/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const eventProfile = await Event.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!eventProfile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });
    }

    res.json(eventProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   POST api/event
// @desc    Create and update an event profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Event name is required").not().isEmpty(),
      check("date", "Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventFields = { user: req.user.id, event: [] };

    const obj = {
      name: req.body.name,
      date: req.body.date,
    };

    try {
      let profile = await Event.findOne({ user: req.user.id });

      if (!profile) {
        profile = new Event(eventFields);
      } else {
        profile.event.unshift(obj);
      }

      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route   GET api/event
// @desc    Get all events
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   DELETE api/event/:event_id
// @desc    Delete event by event_id
// @access  Private
router.delete("/:event_id", auth, async (req, res) => {
  try {
    let profile = await Event.findOne({ user: req.user.id });

    const removeIndex = profile.event
      .map((item) => item.id)
      .indexOf(req.params.event_id);

    profile.event.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   DELETE api/event
// @desc    Delete account
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    await Event.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User removed." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;

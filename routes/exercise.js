require('dotenv').config()
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Exercise = require("../models/Exercise");
const { body, validationResult } = require("express-validator");


const _envClient =  parseInt(process.env.clientError);
const _envServerError =  parseInt(process.env.serverError);
const _envNotFound =  parseInt(process.env.notFound);
const _envUnauthorizedResponse =  parseInt(process.env.unauthorizedResponse);

// Route1: Get all the notes using: GET "/api/auth/fetchallnotes".Login required
router.get("/fetchallexercises", fetchuser, async (req, res) => {
  try {
    const exercise = await Exercise.find({ user: req.user.id });
    res.json(exercise);
  } catch (error) {
    console.error(error.message);
    res.status(_envServerError).send("Internal Server Error");
  }
});

// Route2: Add a new note using: POST "/api/auth/addnote".Login required
router.post(
  "/addexercise",
  fetchuser,
  [
    body("name", "Enter a valid title").isLength({ min: 4 }),
    body("description", "Description must be atleast 5 characters").isLength({min: 5,}),
  ],
  async (req, res) => {
    try {
      const { name, description, activity,duration } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(_envClient).json({ errors: errors.array() });
      }
      const newExercise  = new Exercise({
        name,
        description,
        activity,
        duration,
        user: req.user.id,
      });
      const savedExercise = await newExercise.save();
      res.json({
        success: true,
        detail: savedExercise
      });
    } catch (error) {
      console.error(error.message);
      res.status(_envServerError).send("Internal Server Error");
    }
  }
);

// Route3: Update an exisitng note using: PUT "/api/notes/updatenote".Login required
router.put("/updateexercise/:id", fetchuser, async (req, res) => {
  const { name, description, activity,duration } = req.body;
  try {
    //Create a new note object
    const newExercise = {};
    if (name) {
      newExercise.name = name;
    }
    if (description) {
      newExercise.description = description;
    }
    if (activity) {
      newExercise.activity = activity;
    }
    if (duration) {
      newExercise.duration= duration;
    }

    // Find the note to be updated and update it.
    let exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(_envNotFound).send("Not Found");
    }
    if (exercise.user.toString() !== req.user.id) {
      return res.status(_envUnauthorizedResponse).send("Not Allowed");
    }
    exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { $set: newExercise },
      { new: true }
    );
    res.json({ 
      success: true,
      exercise });
  } catch (error) {
    console.error(error.message);
    res.status(_envServerError).send("Internal Server Error");
  }
});

// Route4: Delete an exisitng note using: DELETE "/api/notes/updatenote".Login required
router.delete("/deleteexercise/:id", fetchuser, async (req, res) => {
  // const { title, description, tag } = req.body;
  try {
    // Find the note to be deleted and delete it.
    let exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(_envNotFound).send("Not Found");
    }
    if (exercise.user.toString() !== req.user.id) {
      return res.status(_envUnauthorizedResponse).send("Not Allowed");
    }
    //Allow Deletion only if user owns the note
    exercise = await Exercise.findByIdAndDelete(req.params.id);
    res.json({ success: true, note: exercise });
  } catch (error) {
    console.error(error.message);
    res.status(_envServerError).send("Internal Server Error");
  }
});

module.exports = router;

const router = require('express').Router();

const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require("../../controllers/thought-controller");

// set up all thought routes
router.route("/").get(getAllThoughts).post(createThought);

// set up get one thought routes
router
    .route(":/thoughtId")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// set up reaction routes
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;
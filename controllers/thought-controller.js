const { User, Thought } = require('../models');

const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res){},

    // get single thought
    getThoughtById({ params }, res){},

    // create thought
    createThought({ body }, res){},

    // update thought
    updateThought({ params, body }, res){},

    // delete thought
    deleteThought({ params }, res){},

    // add reaction
    addReaction({ params, body }, res){},

    // delete reaction
    deleteReaction({ params, body}, res){},
}

module.exports = thoughtController;
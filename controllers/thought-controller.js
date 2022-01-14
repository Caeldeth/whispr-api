const { User, Thoughts } = require("../models");

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
            .populate({ path: "reactions", select: "-__v " })
            .select("-__v")
            .then((dbThoughtsData) => res.json(dbThoughtsData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // get single thought
    getThoughtById({ params }, res) {
        Thoughts.findById({ _id: params.thoughtId })
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(300).json({ message: "thoughtId not found" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // create thought
    createThought({ body }, res) {
        Thoughts.create(body)
            .then((data) => {
                User.findOneAndUpdate(
                    { username: data.username },
                    { $push: { thoughts: data._id } },
                    { new: true }
                )
                    .then((dbUserData) => {
                        if (!dbUserData) {
                            res.status(404).json({ message: "userId not found " });
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json(err);
                    });
            })
            .catch((err) => res.status(400).json(err));
    },

    // update thought
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "thoughtId not found" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete thought
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.thoughtId })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "thoughtId not found" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // add reaction
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId }, { $addToSet: { reactions: body } }, { new: true })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "thoughtId not found" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.json(err));
    },

    // delete reaction
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtsData) => res.json(dbThoughtsData))
            .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;

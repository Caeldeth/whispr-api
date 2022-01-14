const { User } = require("../models");

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // get one user by id
    getUserById({ params }, res) {
        user.findOne({ _id: params.id })
        .populate('thoughts')
        .populate('friends')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // make a user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData = res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json.err
        })
    },

    // update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendsId } },
            { new: true }
        )
        .then((dbUserData) = res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendsId } },
            { new: true }
        )
        .then(dbFriendsData => {
            if(!dbFriendsData) {
                res.status(404).json({ message: 'No user found with that id '})
                return
            }
            res.json(dbFriendsData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },
}

module.exports = userController;
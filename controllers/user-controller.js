const { User, Thought } = require("../models");

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
        .populate({ path: 'thoughts', select: "-__v" })
        .populate({ path: 'friends', select: "-__v" })
        .select('-__v')
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
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
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
        User.findOneAndDelete({ _id: params.userId })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'})
                return
            }
            User.updateMany(
                { _id: { $in: dbUserData.friends } },
                { $pull: { friends: params.userId } }
            )
            .then(() => {
                Thought.deleteMany({ username: dbUserData.username })
                .then(() => {
                    res.json({ message: "User deleted!"});
                })
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendsId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "userId not found" });
                return;
            }
            User.findOneAndUpdate(
                { _id: params.friendsId },
                { $addToSet: { friends: params.userId } },
                { new: true, runValidators: true }
            )
            .then(dbFriendsData => {
                if(!dbFriendsData) {
                    res.status(404).json({ message: 'friendId not found'})
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        }) 
        .catch((err) => res.status(400).json(err));
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendsId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id '});
            }
            User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendsId } },
                { new: true, runValidators: true }
            )
            .then(dbFriendsData => {
                if(!dbFriendsData) {
                    res.status(404).json({ message: 'No user found with that id '})
                    return
                }
                res.json(dbFriendsData)
                res.json({ message: 'friendId deleted'});
            })
            .catch(err => res.json(err));
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },
}

module.exports = userController;
const router = require('express').Router();

const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require("../../controllers/user-controller");

// set up all user routes
router.route("/").get(getAllUsers).post(createUser);

// set up one user routes
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// set up friend routes
router.route("/:userId/friends/:friendsId").post(addFriend).delete(deleteFriend);

module.exports = router;
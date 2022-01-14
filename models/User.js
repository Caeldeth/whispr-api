const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/],
        },
        thoughts: [], //need to create thoughts model
        friends: [], //need to create friends model
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual to count how many friends a user has - use same virtual as pizza hunt
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

// create the user model using userSchema
const User = model('User', UserSchema)

// export the model
module.exports = User;

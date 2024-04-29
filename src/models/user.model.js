import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    profileImage: {
        type: String,
        default: "https://i.ibb.co/112h44k/default-profile-picture.png"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

// Middleware to hash the user's password before saving to the database
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Middleware to compare the user's password with the hash in the database
// userSchema.methods.isCorrectPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

const User = model("User", userSchema);
export default User;
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';



export const signup = async (req, res) => {
    console.log(req.body)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profileImage: req.body.profileImage,
        isAdmin: req.body.isAdmin
    });

    await newUser.save();

   res.send(newUser);
}
export const signin = async (req, res) => {
    res.send('Hello World!');
}
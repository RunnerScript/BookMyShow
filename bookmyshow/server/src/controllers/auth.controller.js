const User = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const onLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Incompleted Data" });
    }

    try {

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ success: false, message: "User does not exists, please Register." });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.send({ success: false, message: "Sorry! Invalid Password Entered." })
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

        return res.status(200).send({ success: true, message: "Login Successful", access_token: token });

    } catch (error) {
        return res.status(500).send({ message: `Internal Server Error, Please try Again` })
    }

}

const onRegister = async (req, res) => {

    const { name, email, password } = req.body;
    let { role } = req.body;
    if (!role) {
        role = 'user';
    }
    if (!name || !email || !password) {
        return res.status(400).send({ message: "Incompleted Data" });
    }

    try {
        const user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).send({ success: false, message: "User Already Exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({ name, email, password: hashedPassword, role: role });
        await newUser.save();
        res.status(201).send({ success: true, message: "Registration Successful, Please login." });

    } catch (error) {
        return res.status(500).send({ message: `Internal Server Error, Please try Again` })
    }

}
module.exports = { onLogin, onRegister };
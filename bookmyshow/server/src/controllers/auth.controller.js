const User = require('../models/auth.model');
const bcrypt = require('bcrypt');

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
            res.send({ success: false, message: "Sorry! Invalid Password Entered." })
        }

        return res.status(200).send({ success: true, message: "Login Successful" });

    } catch (error) {
        return res.status(500).send({ message: `Internal Server Error, Please try Again` })
    }

}

const onRegister = async (req, res) => {

    const { name, email, password } = req.body;

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
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).send({ success: true, message: "Registration Successful, Please login." });

    } catch (error) {
        return res.status(500).send({ message: `Internal Server Error, Please try Again` })
    }

}
module.exports = { onLogin, onRegister };
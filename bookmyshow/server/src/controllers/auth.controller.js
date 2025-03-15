const User = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { otpGenerator } = require("../../utils/appHelper");
const { EmailHelper } = require("../../utils/emailHelper");


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

const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).send({
            success: true,
            message: "Fetched Current User",
            data: req.userDetails || null
        });


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }
}

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(401).send({
            success: false,
            message: "Email is required",
        });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid Email Address",
            });
        }

        const otp = otpGenerator()
            ;
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        await EmailHelper("otp.html", email, "Reset Password Verification OTP", { name: user.name, otp: otp });

        return res.status(200).send({
            success: true,
            message: "OTP sent to your email"
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }

}

const resetPassword = async (req, res) => {
    const resetDetails = req.body;
    const { email } = req.params;
    console.log(email);
    if (!resetDetails.password || !resetDetails.otp) {
        return res.send(400).send({
            success: false,
            message: "Email and otp required"
        });
    }
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        if (Date.now() > user.otpExpiry) {
            return res.status(400).send({
                success: false,
                message: "OTP is expired"
            });
        }

        if (user.otp !== resetDetails.otp) {
            return res.status(400).send({
                success: false,
                message: "Invalid Otp"
            });
        }

        const salt = bcrypt.genSaltSync(10);
        console.log(salt);
        const hashedPassword = bcrypt.hashSync(resetDetails.password, salt);
        user.password = hashedPassword;
        console.log(hashedPassword);
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        return res.status(200).send({
            success: true,
            message: "Password Reset Successfully."
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

module.exports = { onLogin, onRegister, getCurrentUser, forgetPassword, resetPassword };
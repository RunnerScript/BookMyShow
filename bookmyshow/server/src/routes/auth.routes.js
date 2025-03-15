const { onLogin, onRegister, getCurrentUser, forgetPassword, resetPassword } = require("../controllers/auth.controller");

const express = require('express');
const { verifyToken } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post('/register', onRegister);
authRouter.post('/login', onLogin);
authRouter.get('/currentuser', verifyToken, getCurrentUser);

authRouter.patch('/forgetpassword', forgetPassword);

authRouter.post('/resetpassword/:email', resetPassword);
module.exports = authRouter;
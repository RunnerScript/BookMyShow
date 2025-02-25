const { onLogin, onRegister, OnRegister } = require("../controllers/auth.controller");

const express = require('express');
const authRouter = express.Router();

authRouter.post('/register', onRegister);
authRouter.post('/login', onLogin);

module.exports = authRouter;
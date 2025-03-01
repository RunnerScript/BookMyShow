const { onLogin, onRegister, getCurrentUser } = require("../controllers/auth.controller");

const express = require('express');
const { verifyToken } = require("../middlewares/auth.middleware");
const authRouter = express.Router();

authRouter.post('/register', onRegister);
authRouter.post('/login', onLogin);
authRouter.get('/currentuser', verifyToken, getCurrentUser);

module.exports = authRouter;
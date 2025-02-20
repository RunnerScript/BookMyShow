const { onLogin, onRegister, OnRegister } = require("../controllers/auth.controller");

module.exports = (app) => {
    app.post('/register', onLogin);
    app.post('/login', onRegister);
}
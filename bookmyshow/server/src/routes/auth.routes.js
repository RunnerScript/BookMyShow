const { onLogin, onRegister, OnRegister } = require("../controllers/auth.controller");

module.exports = (app) => {
    app.post('/register', onRegister);
    app.post('/login', onLogin);
}
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    //console.log(req.headers.Autorization);
    //if token is correct, move ahead to the actual work

    const isAuthenticated = false;
    const tokenString = req.headers['authorization'];

    if (!tokenString) {
        return res.status(403).send({ message: "No token is provided." })
    }

    const token = tokenString.split(' ')[1];
    console.log("Tokendata", token, process.env.SECRET_KEY);
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).send({ message: "Invalid JWT Token" });
        }
        console.log("Token is valid");
        next();
    });

    //if token is incorrect, send exception
    if (!isAuthenticated) {
        return res.status(403).send({ message: "You are not allowed to access this route." })
    }
    next();
}

module.exports = {
    verifyToken
}
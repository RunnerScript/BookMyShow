const jwt = require("jsonwebtoken");
const User = require('../models/auth.model');

const verifyToken = (req, res, next) => {
    //if token is correct, move ahead to the actual work
    const tokenString = req.headers['x-access-token'];

    if (!tokenString) {
        return res.status(403).send({ message: "No token is provided." })
    }

    const token = tokenString.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
        if (err) {
            return res.status(403).send({ message: "Invalid JWT Token" });
        }


        const userId = payload.userId;

        try {
            const user = await User.findById(userId);

            req.userDetails = user;
        } catch (error) {

        }
        next();
    });
}



const verifyAdmin = (req, res, next) => {

    const role = req.userDetails.role;

    if (role !== 'admin') {
        return res.status(403).send({ message: "You are unauthorized to perfom this operation." })
    }
    next();
}


const verifyAdminOrPartner = (req, res, next) => {
    const role = req.userDetails.role;
    console.log("Role", role);
    if (role !== 'admin' && role !== 'partner') {
        return res.status(403).send({ message: "You are unauthorized to perfom this operation." })
    }
    next();
}
module.exports = {
    verifyToken,
    verifyAdmin,
    verifyAdminOrPartner
}

/*getAllTheatres should be a protected route
 for admin right

 
*/
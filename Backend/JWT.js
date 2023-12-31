//Create a token and verify if a user is verified or not
const jwt = require("jsonwebtoken");
const secretKey = 'b1b5e5d26254a5d8075f4d91da5a196ebc8a7959ee69452317684400fbc997a19f3ec5';


//function to create a token 
const createTokens = (user) => {
    const accessToken = jwt.sign(
        { name: user.name, email: user.email, id: user.id },
        secretKey,
    );

    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        res.locals.authenticated = false;
        res.authenticated = false;
        return next();
    }
    try {
        const validToken = jwt.verify(accessToken, secretKey)
        if (validToken) {
            res.locals.authenticated = true;
            req.authenticated = true

            req.jwtPayload = validToken;
            next();
            return validToken;
        }
    } catch (error) {
        return console.log(error)
    }
}

module.exports = { createTokens, validateToken }


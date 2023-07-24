const jwt = require('jsonwebtoken');

// Configure Token secret and expiration
const secret = 'nooneknowsmysecrets';
const expiration = '2h';

module.exports = {
    // Authentication Middleware function
    authMiddleware: function ({ req }) {
        let token = req.query.token || req.headers.authorization;

        if(req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if(!token) {
            return req;
        }

        // Try/catch block with function to decode and attach user's data to request
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch (error) {
            console.error('Invalid Token');
        }

        return req;
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};

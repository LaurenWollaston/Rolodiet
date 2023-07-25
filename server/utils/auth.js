const jwt = require('jsonwebtoken');

// Configure Token secret and expiration
const secret = 'nooneknowsmysecrets';
const expiration = '2h';

// Generate token
function signToken({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
function getUserFromToken(token) {
    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        return data;
    } catch (error) {
        console.error('Invalid Token');
        return null;
    }
}

module.exports = {
    signToken,
    getUserFromToken
};
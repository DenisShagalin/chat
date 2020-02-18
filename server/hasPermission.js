const jwt = require('jsonwebtoken');
const config = require('./routes/config.json');

const ADMIN_ROLE = 'Admin';

const hasPermission = (token) => {
    var decoded = jwt.verify(token.replace('Bearer ', ''), config.secret);
    if (decoded.role === ADMIN_ROLE) return true;
    return false;
}

module.exports = hasPermission;

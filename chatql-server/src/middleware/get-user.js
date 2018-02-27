const { AuthService } = require('../services/auth-service');

async function getUser(req, res, done, azure){
    var authService = new AuthService(azure);
    req.user = await authService.getUserByAuthToken(req);
    done();
}

module.exports = {
    getUser,
}
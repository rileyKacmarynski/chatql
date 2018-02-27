const { AuthService } = require('../services/auth-service');

async function getUser(req, res, done, azure){
    var authService = new AuthService(azure);
    req.user = await authService.getUserByAuthToken(req);
    console.log(req.user);
    done();
}

module.exports = {
    getUser,
}
const { AuthService } = require('../services/auth-service');

async function getUser(req, res, done, azure){
    var authService = new AuthService(azure);
    var user = await authService.getUserByAuthToken(req);

    if(user.entries.length > 0){
        req.user = user.entries[0];
    }
    done();
}

module.exports = {
    getUser,
}
const { makeAuthService } = require('../services/auth-service');
const { CONNECTION_STRING } = require('../constants');

async function getUser(req, res, done, azure){

    const tableService = azure.createTableService(CONNECTION_STRING);
    const authService = makeAuthService({ 
        tableService, 
        azure
    });
    const user = await authService.getUserByAuthToken(req);
    if(user && user.entries && user.entries.length > 0){
        req.user = user.entries[0];
    }
    done();
}

module.exports = {
    getUser,
}
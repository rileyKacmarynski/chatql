

const {AuthService} = require('../services/auth-service');
const { CONNECTION_STRING} = require('../constants'); 


async function signup(parent, {password, username}, context, info) {
    
    const authService =  new AuthService(
        context.azure.createTableService(CONNECTION_STRING)
    );

    if(await authService.checkForExistingUser(context.azure, username)){
        throw new Error("Username already exists");
    } else {
        return authService.createUser(username, password);
    }

}

module.exports = {
    signup,
}
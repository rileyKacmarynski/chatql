

const {AuthService} = require('../services/auth-service');

function getAuthService(context){
    return new AuthService(
        context.azure
    );
}

async function signup(parent, {password, username}, context, info) {
    const authService = getAuthService(context);

    if(await authService.checkForExistingUser(username)){
        throw new Error("Username already exists");
    } else {
        return authService.createUser(username, password);
    }
}

async function login(parent, args, context, info) {
    return getAuthService(context)
        .login(args.username, args.password);
}

module.exports = {
    signup,
    login,
}
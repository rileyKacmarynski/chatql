const {makeMessageService} = require('../services/message-service');
const {makeAuthService} = require('../services/auth-service');
const { MESSAGE_SUBSCRIPTION_TOPIC, CONNECTION_STRING } = require('../constants');

function getAuthService(context){
    return new AuthService(
        context.azure
    );
}

async function signup(parent, {password, username}, context, info) {
    const tableService = getTableService(context);
    const authService = makeAuthService({ 
        tableService, 
        azure: context.azure
    });

    if(await authService.checkForExistingUser(username)){
        throw new Error("Username already exists");
    } else {
        return authService.createUser(username, password);
    }
}

async function login(parent, args, context, info) {
    const tableService = getTableService(context);
    const authService = makeAuthService({ 
        tableService, 
        azure: context.azure
    });

    return authService.login(args.username, args.password);
}

function createMessage(parent, args, context, info){
    var user = context.request.user;
    const {content} = args;
    if(!user) throw new Error("Not Authorized");

    const tableService = getTableService(context);
    const messageService = makeMessageService({
        azure: context.azure, 
        tableService: tableService
    });

    var message = messageService.createMessage(user, content);

    context.pubSub.publish(MESSAGE_SUBSCRIPTION_TOPIC, { newMessage: message });
    return message;
}

function getTableService(context){
    return context.azure.createTableService(CONNECTION_STRING);
}

module.exports = {
    signup,
    login,
    createMessage,
}
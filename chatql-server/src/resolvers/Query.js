const { CONNECTION_STRING } = require('../constants'); 
const {makeMessageService} = require('../services/message-service');
const {makeAuthService} = require('../services/auth-service');

function users(parent, {username}, context, info) {
    const tableService = context.azure.createTableService(CONNECTION_STRING);
    const authService = makeAuthService({ 
        tableService, 
        azure: context.azure
    });
    return authService.getUsers(username); 
}

function messages(parent, {take}, context, info){

    const tableService = context.azure.createTableService(CONNECTION_STRING);
    const messageService = makeMessageService({
        azure: context.azure, 
        tableService: tableService
    });
    return messageService.getMessages(take);
}

function authPayload(parent, args, context, info){
    return {
        token: "",
        user: {
            id: "",
            username: "",
        }
    }
}

module.exports = {
users,
messages,
authPayload,
}
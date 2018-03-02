const { CONNECTION_STRING } = require('../constants'); 
const {MessageService} = require('../services/message-service');
const {AuthService} = require('../services/auth-service');

function users(parent, {username}, context, info) {
    const authService = new AuthService(context.azure);

    return authService.getUsers(username); 
}

function messages(parent, {take}, context, info){
    const messageService = new MessageService(context.azure);
    return messageService.getMessages(take);
}

module.exports = {
users,
messages,
}
const { CONNECTION_STRING } = require('../constants'); 
const {MessageService} = require('../services/message-service');


function users(parent, args, context, info) {
    const tableService = context.azure.createTableService(CONNECTION_STRING);

    const query = new context.azure.tableQuery()
        .where('PartitionKey eq ?', 'User');
    
    return [
        { id: 'asdfasdfasd', username: 'bob'},
        { id: 'asdfafdsafddfasd', username: 'bob'},
    ]
}

function messages(parent, {take}, context, info){
    const messageService = new MessageService(context.azure);

    return messageService.getMessages(take);
}

module.exports = {
users,
messages,
}
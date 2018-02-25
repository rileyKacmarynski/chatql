const { CONNECTION_STRING } = require('../constants'); 

function users(parent, args, context, info) {
    const tableService = context.azure.createTableService(CONNECTION_STRING);

    const query = new context.azure.tableQuery()
        .where('PartitionKey eq ?', 'User');
    
    return [
        { id: 'asdfasdfasd', username: 'bob'},
        { id: 'asdfafdsafddfasd', username: 'bob'},
    ]
  }

  module.exports = {
    users,
  }
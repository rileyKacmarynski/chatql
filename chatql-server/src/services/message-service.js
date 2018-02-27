const guid = require('guid');

const { insertEntity, queryTable } = require('../helpers/azure-storage-wrapper');
const { CONNECTION_STRING, APP_SECRET } = require('../constants');

class MessageService {
    constructor(azure){
        this.tableService = azure.createTableService(CONNECTION_STRING);
        this.azure = azure;
    }

    async createMessage(user, content){
        //send call to query the table
    }
}

module.exports = {
    MessageService,
}